from django.contrib import messages
from django.shortcuts import render, redirect

# Create your views here.
def cadastro_empresa(request):
    if request.method == 'POST':
        cnpj = request.POST['cnpj']
        nome = request.POST['nomeEmpresa']
        email = request.POST['emailEmpresa']
        senha = request.POST['senhaEmpresa']
        conSenha = request.POST['conSenhaEmpresa']

        if senha != conSenha:
            messages.error(request, 'As senhas não coincidem')
            return redirect('empresa')