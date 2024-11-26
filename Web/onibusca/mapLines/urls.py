from django.urls import path
from . import views

urlpatterns = [
    path('formLinhas/', views.cadastro_linha, name='formLinhas'),
    path('linhas/', views.exibir_linha, name='linhas'),
    path('sobreLinha/', views.sobre_linha, name='sobreLinha')
]