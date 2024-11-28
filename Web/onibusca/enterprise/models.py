from django.db import models

# Create your models here.
class Estado(models.Model):
    nome = models.CharField(max_length=100)
    sigla = models.CharField(max_length=2, unique=True)

    def __str__(self):
        return self.sigla

class Cidade(models.Model):
    nome = models.CharField(max_length=28)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, related_name='cidades')

    class Meta:
        unique_together = (('nome', 'estado'),)

class Enterprise(models.Model):
    cnpj = models.CharField(max_length=14, unique=True)
    nome = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    cidades = models.ManyToManyField(Cidade, related_name='empresas')