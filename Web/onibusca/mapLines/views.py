from .models import Lines
from django.shortcuts import render, redirect

# Create your views here.
def cadastro_linha(request):
    ''' Realizar cadastro de linhas '''
    if request.method == 'POST':
        linha = request.POST['linha']
        inicio = request.POST['horaInicial']
        termino = request.POST['horaTermino']

        lines = Lines(linha=linha, inicio=inicio, termino=termino)
        lines.save()
    
    return render(request, 'formLinhas.html')

def exibir_linha(request):
    return render(request, 'linhas.html')

def sobre_linha(request):
    return render(request, 'sobreLinha.html')