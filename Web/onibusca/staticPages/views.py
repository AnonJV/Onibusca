from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request, 'index.html', {'user': request.user})

def quem_somos_view(request):
    return render(request, 'quemSomos.html')

def suporte_view(request):
    return render(request, 'suporte.html')