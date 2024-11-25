from django.db import models
from django.contrib.auth.models import AbstractUser, Group

# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    nascimento = models.DateField()
    cep = models.CharField(max_length=9)
    cidade = models.CharField(max_length=28)
    uf = models.CharField(max_length=2)
    termos = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Se fuder, tive que adicionar essas linhas de merda só para não causar conflito
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        group, created = Group.objects.get_or_create(name='comum')
        self.groups.add(group)