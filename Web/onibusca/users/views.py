import pyotp
import smtplib
import email.message
from .models import User
from datetime import datetime
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.
def cadastro_view(request):
    ''' Realizar cadastro de usuários comuns '''
    if request.method == 'POST':
        first_name = request.POST['nomeUser']
        last_name = request.POST['sobreNome']
        nascimento = request.POST['nascimento']
        email = request.POST['email']
        senha = request.POST['senha']
        conSenha = request.POST['conSenha']

        if senha != conSenha:
            messages.error(request, 'As senhas não coincidem')
            return redirect('cadastro')
        
        cep = request.POST['cep']
        cidade = request.POST['cidade']
        uf = request.POST['uf']
        termos = request.POST['termos'] == 'on'

        user_email = email
        codigo_verificacao = verifica_email(first_name, user_email)

        request.session['codigo_verificacao'] = codigo_verificacao
        request.session['user_data'] = {
            'first_name': first_name,
            'last_name': last_name,
            'nascimento': nascimento,
            'email': email,
            'senha': senha,
            'cep': cep,
            'cidade': cidade,
            'uf': uf,
            'termos': termos
        }
        
        return redirect('auth')
    
    return render(request, 'cadastro.html')
    
def auth_view(request):
    if request.method == 'POST':
        n1 = request.POST['number1']
        n2 = request.POST['number2']
        codigo_inserido = n1 + n2

        if codigo_inserido == request.session.get('codigo_verificacao'):
            user_data = request.session.get('user_data')
            user = User(first_name=user_data['first_name'], last_name=user_data['last_name'], nascimento=user_data['nascimento'], email=user_data['email'], cep=user_data['cep'], cidade=user_data['cidade'], uf=user_data['uf'], is_active=True, is_superuser=False, is_staff=False)
            
            user.set_password(user_data['senha'])
            user.save()
            messages.success(request, 'Cadastro realizado com sucesso!')
            return redirect('login')
        else:
            messages.error(request, 'Código incorreto!')

    return render(request, 'auth.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        senha = request.POST['senha']

        user = authenticate(request, email=email, password=senha)

        if user is not None:
            login(request, user)
            messages.success(request, 'Login realizado com sucesso!')
            return redirect('home')
        else:
            messages.error(request, 'Email ou senha inválidos')

    return render(request, 'login.html')

    
def verifica_email(first_name, user_email):
    ''' Enviar token de autenticação para email '''
    
    def codigo():
        token = pyotp.random_base32()
        totp = pyotp.TOTP(token, digits=2)
        return totp.now()
    
    # Código principal da verificação
    codigo_verificacao = codigo()
    data_hora_atual = datetime.now()
    data_formatada = data_hora_atual.strftime('%d de %B ás %H:%M')

    corpo_email = f"""
        <!DOCTYPE html>
        <html lang="pt-br">
 
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo ao OniBusca</title>
            <style>
                body {{
                    font-size: 50px;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                }}
                .logo {{
                    display: flex;
                    justify-content: left;
                    margin-bottom: 20px;
                }}
                .logo img {{
                    width: 200px;
                }}
                .code {{
                    font-size: 2em;
                    font-weight: bold;
                    margin: 20px 0;
                }}
                .footer {{
                    font-size: 0.8em;
                    color: #777;
                    margin-top: 30px;
                    text-align: center;
                }}
                .footer a {{
                    color: #777;
                    text-decoration: none;
                }}
                .footer .oni {{
                    width: 100px;
                }}
            </style>
        </head>
 
        <body>
            <div class="container">
                <div class="logo">
                    <img src="https://i.postimg.cc/KvSqcVqc/M-dia.jpg" alt="OniBusca Logo">
                </div>
                <h2>Olá, {first_name}</h2>
                <p>Bem-vindo ao nosso projeto de <br>
                    localização do transporte público. <br>
                    Estamos muito felizes de tê-lo conosco.</p>
                <p>Para concluir o cadastro, estamos <br> enviando um código único:</p>
                <div class="code">{codigo_verificacao}</div>
                <p>{data_formatada}</p>
                <div class="footer">
                    <hr>
                    <img class="oni" src="https://i.postimg.cc/KvSqcVqc/M-dia.jpg" alt="OniBusca Logo">
                    <p>&copy; Onibusca. OrkaShield, Capivari, São Paulo</p>
                    <p>Esta mensagem foi enviada para {user_email} e destina a {first_name}. Não é sua conta? <a href="#">Remova seu email dessa conta</a>.</p>
                </div>
            </div>
        </body>
 
        </html>
        """

    msg = email.message.Message()
    msg['Subject'] = f'Bem-vindo ao Onibusca, {first_name}!'
    msg['From'] = f'onibuscanoreply@gmail.com'
    msg['To'] = user_email
    password = 'mcue pfxb ffar ggyl'

    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com:587')
    s.starttls()
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    s.quit()

    return codigo_verificacao