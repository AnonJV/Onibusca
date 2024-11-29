from django.db import models


class Enterprise(models.Model):
    cnpj = models.CharField(max_length=14, unique=True)
    nome = models.CharField(max_length=50)
    email = models.EmailField(unique=True)