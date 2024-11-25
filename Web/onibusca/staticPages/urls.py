from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('quemSomos/', views.quem_somos_view, name='quem_somos'),
    path('suporte/', views.suporte_view, name='suporte')
]