from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length = 100)

    def __str__(self):
        return self.name
    
class Pet(models.Model):
    name = models.CharField(max_length = 100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length = 10, null = True, blank = True)
    nationality = models.CharField(max_length = 25, null = True, blank = True)
    personality = models.CharField(max_length = 250, null = True, blank = True)
    species = models.CharField(max_length= 150)
    hungry = models.IntegerField(default = 0)
    happy = models.IntegerField(default = 0)
    poop = models.IntegerField(default = 0)
    health = models.IntegerField(default = 100)
    # One pet has one owner.
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    
    def __str__(self):
        return self.name