from django.db import models

# Create your models here.
class Lines(models.Model):
    linha = models.CharField(max_length=100)
    inicio = models.TimeField(null=True)
    termino = models.TimeField(null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)