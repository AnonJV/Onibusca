require 'sinatra'
require 'net/http'
require 'json'
require 'uri'
require 'dotenv/load'
require 'date'

PONTO_PARTIDA = ENV['COORDENADA_INICIAL'].split(',').map(&:to_f)
PONTO_CHEGADA = ENV['COORDENADA_FINAL'].split(',').map(&:to_f)
API_VEICULO = ENV['API_URI']
ARQUIVO_HISTORICO = 'historico_15401.json'
ARQUIVO_ROTA_COMPLETA = ENV['ARQUIVO_ROTA_COMPLETA']

URL_OSRM_API = 'http://router.project-osrm.org/route/v1/driving/'
RAIO_DA_CHEGADA = 100
NUMERO_DE_PONTOS_A_FRENTE = 50

def calcula_distancia_nerd(ponto_a, ponto_b)
  rad_por_grau = Math::PI / 180
  raio_da_terra = 6371
  raio_em_metros = raio_da_terra * 1000
  delta_lat = (ponto_b[0] - ponto_a[0]) * rad_por_grau
  delta_long = (ponto_b[1] - ponto_a[1]) * rad_por_grau
  lat_a = ponto_a[0] * rad_por_grau
  lat_b = ponto_b[0] * rad_por_grau
  a = Math.sin(delta_lat / 2)**2 + Math.cos(lat_a) * Math.cos(lat_b) * Math.sin(delta_long / 2)**2
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  raio_em_metros * c
end

def faz_um_get_maroto_na_api
  uri = URI.parse(API_VEICULO)
  requisicao = Net::HTTP::Get.new(uri)
  requisicao.basic_auth(ENV['USUARIO_API'], ENV['SENHA_API'])
  resposta = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    http.request(requisicao)
  end
  if resposta.is_a?(Net::HTTPSuccess)
    corpo = resposta.body.encode('UTF-8', invalid: :replace, undef: :replace, replace: '')
    begin
      JSON.parse(corpo)
    rescue JSON::ParserError
      {}
    end
  else
    {}
  end
end

def salva_o_historico_das_paradas(historico_coordenadas)
  File.open(ARQUIVO_HISTORICO, 'w') do |file|
    file.write(JSON.pretty_generate(historico_coordenadas))
  end
end

def carrega_o_historico_das_paradas
  return [] unless File.exist?(ARQUIVO_HISTORICO)
  JSON.parse(File.read(ARQUIVO_HISTORICO))
rescue JSON::ParserError
  []
end

def limpa_historico_para_o_proximo_role
  File.delete(ARQUIVO_HISTORICO) if File.exist?(ARQUIVO_HISTORICO)
end

def carrega_rota_completa
  return [] unless ARQUIVO_ROTA_COMPLETA && File.exist?(ARQUIVO_ROTA_COMPLETA)
  json_data = JSON.parse(File.read(ARQUIVO_ROTA_COMPLETA))
  percurso_completo = json_data["PercursoCompleto"] || []
  coordinates = percurso_completo.map do |entry|
    coord_str = entry["COORDENADA"]
    coord = coord_str.split(',').map(&:strip).map(&:to_f)
    coord
  end
  adjusted_coordinates = ajusta_rota_no_mapa_completo(coordinates)
  adjusted_coordinates
rescue JSON::ParserError
  []
end

get '/rota_completa' do
  content_type :json
  rota_completa = carrega_rota_completa
  { rota_completa: rota_completa }.to_json
end

def ajusta_rota_no_mapa(historico_coordenadas)
  coordenadas_validas = historico_coordenadas
                          .select { |entry| entry["coordenada"].is_a?(Array) && entry["coordenada"].length == 2 }
                          .map { |entry| entry["coordenada"] }
  return [] if coordenadas_validas.empty?
  max_waypoints = 100
  if coordenadas_validas.size > max_waypoints
    step = (coordenadas_validas.size / max_waypoints.to_f).ceil
    coordenadas_validas = coordenadas_validas.each_slice(step).map(&:first)
    coordenadas_validas << coordenadas_validas.last unless coordenadas_validas.last == coordenadas_validas.last
  end
  coordenadas_para_osrm = coordenadas_validas.map { |coord| coord.reverse.join(',') }
  coordenadas_str = coordenadas_para_osrm.join(';')
  uri = URI("#{URL_OSRM_API}#{coordenadas_str}?overview=full&geometries=geojson")
  resposta = Net::HTTP.get_response(uri)
  if resposta.is_a?(Net::HTTPSuccess)
    json_data = JSON.parse(resposta.body)
    coordenadas = json_data.dig("routes", 0, "geometry", "coordinates") || []
    coordenadas.map! { |coord| coord.reverse }
    coordenadas.select! do |coord|
      coord[0].between?(-90, 90) && coord[1].between?(-180, 180)
    end
    coordenadas
  else
    []
  end
end

def ajusta_rota_no_mapa_completo(coordinates)
  route_url = 'http://router.project-osrm.org/route/v1/driving/'
  max_waypoints = 100
  if coordinates.size > max_waypoints
    step = (coordinates.size / max_waypoints.to_f).ceil
    coordinates_sampled = coordinates.each_slice(step).map(&:first)
    coordinates_sampled << coordinates.last unless coordinates_sampled.last == coordinates.last
  else
    coordinates_sampled = coordinates
  end
  coordinates_osrm = coordinates_sampled.map { |coord| coord.reverse.join(',') }
  coordinates_str = coordinates_osrm.join(';')
  url = "#{route_url}#{coordinates_str}?overview=full&geometries=geojson"
  uri = URI(url)
  response = Net::HTTP.get_response(uri)
  if response.is_a?(Net::HTTPSuccess)
    json_data = JSON.parse(response.body)
    coordinates_route = json_data.dig("routes", 0, "geometry", "coordinates") || []
    coordinates_route.map { |coord| coord.reverse }
  else
    []
  end
end

def veiculo_no_destino?
  File.exist?('veiculo_no_destino.flag')
end

def set_veiculo_no_destino(valor)
  if valor
    File.open('veiculo_no_destino.flag', 'w') { |file| file.write('true') }
  else
    File.delete('veiculo_no_destino.flag') if File.exist?('veiculo_no_destino.flag')
  end
end

def encontra_indice_ponto_mais_proximo(coordenadas_rota, coordenada_atual)
  menor_distancia = Float::INFINITY
  indice_mais_proximo = 0
  coordenadas_rota.each_with_index do |coord, index|
    distancia = calcula_distancia_nerd(coord, coordenada_atual)
    if distancia < menor_distancia
      menor_distancia = distancia
      indice_mais_proximo = index
    end
  end
  indice_mais_proximo
end

def map_match(coordinate)
  coordinates_str = coordinate.reverse.join(',')
  uri = URI("http://router.project-osrm.org/nearest/v1/driving/#{coordinates_str}?number=1")
  response = Net::HTTP.get_response(uri)
  if response.is_a?(Net::HTTPSuccess)
    json_data = JSON.parse(response.body)
    matched_coordinate = json_data.dig("waypoints", 0, "location")
    matched_coordinate.reverse if matched_coordinate
  else
    coordinate
  end
end

get '/' do
  erb :index
end

get '/dados' do
  content_type :json
  dados = faz_um_get_maroto_na_api
  return { erro: 'Nenhum dado disponível' }.to_json unless dados.is_a?(Hash) && dados.key?('TRB_PON_EXEC') && dados['TRB_PON_EXEC'].is_a?(Array) && !dados['TRB_PON_EXEC'].empty?
  dados_filtrados = dados['TRB_PON_EXEC'].select { |entry| entry['CARRO'] == 15401 }
  return { erro: 'Nenhum dado disponível' }.to_json if dados_filtrados.empty?
  ultima_parada = dados_filtrados.max_by { |entry| DateTime.strptime(entry['TS_DATA_HORA2'], '%d/%m/%Y %H:%M:%S') }
  coordenada_atual_str = ultima_parada['COORDENADA']
  coordenada_atual = coordenada_atual_str.split(',').map(&:strip).map(&:to_f)

  coordenada_atual = map_match(coordenada_atual)

  rota_completa = carrega_rota_completa
  indice_mais_proximo = encontra_indice_ponto_mais_proximo(rota_completa, coordenada_atual)
  historico_coordenadas = carrega_o_historico_das_paradas
  unless historico_coordenadas.last&.dig("coordenada") == coordenada_atual
    historico_coordenadas << { "coordenada" => coordenada_atual, "timestamp" => ultima_parada['TS_DATA_HORA2'] }
    salva_o_historico_das_paradas(historico_coordenadas)
  end
  percurso_ajustado = ajusta_rota_no_mapa(historico_coordenadas)
  segmento_rota = limitter(rota_completa, indice_mais_proximo, 50)
  {
    coordenada_atual: coordenada_atual,
    segmento_rota: segmento_rota,
    percurso_ajustado: percurso_ajustado
  }.to_json
end

def limitter(rota_completa, indice_atual, quantidade_pontos)
  indice_final = [indice_atual + quantidade_pontos, rota_completa.length - 1].min
  rota_completa[indice_atual..indice_final]
end

if __FILE__ == $0
  Sinatra::Application.run!
end
