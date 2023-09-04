from django.urls import path
from . import views

urlpatterns = [
    path('pets/', views.pet_details , name= 'pet_details'),
    path('pets/<int:pk>', views.pet_detail,name = 'pet_detail'),
    path('game', views.game, name = 'game'),
]