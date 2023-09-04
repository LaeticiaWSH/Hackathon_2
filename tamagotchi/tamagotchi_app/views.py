from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from .models import Pet
from .serializers import PetSerializer
from django.views.decorators.csrf import csrf_exempt



# Create your views here.

#To get the details about the pet.
@csrf_exempt
def pet_details(request):
    if request.method == 'GET':
        pets = Pet.objects.all()
        serializer = PetSerializer(pets,many = True)
        return JsonResponse(serializer.data, safe = False)
    
    #if i want to add more data types of pet.
    elif request.method == 'POST':
        pet_data = JSONParser().parse(request)
        serializer = PetSerializer(data = pet_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = 201)
        return JsonResponse(serializer.errors, status = 400)
    
#Now the CRUD part without the "C".The "C" part has been done in line 19-26
@csrf_exempt
def pet_detail(request,pk):
    try:
        pet = Pet.objects.get(pk = pk)
    except Pet.DoesNotExist:
        return HttpResponse(status = 404)
    
    if request.method == "GET":
        serializer = PetSerializer(pet)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT' or request.method == 'PATCH':
        pet_data = JSONParser().parse(request)
        serializer = PetSerializer(pet, pet_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status = 400)
    
    elif request.method == 'DELETE':
        pet.delete()
        return HttpResponse(status = 204)

def game(request):
    return render(request, 'index.html',{})