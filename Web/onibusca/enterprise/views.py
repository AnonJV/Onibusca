from django.shortcuts import render

# Create your views here.
def cadastro_empresa(request):
    if request.method == 'POST':
        cnpj = request.POST['cnpj']
        nome = request.POST['nomeEmpresa']
        email = request.POST['emailEmpresa']