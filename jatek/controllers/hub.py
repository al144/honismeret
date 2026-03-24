from django.http import HttpResponseRedirect, HttpResponse, HttpRequest
from django.shortcuts import render

def Hub(request: HttpRequest):

    if request.method == "POST":
        return HttpResponse()
    
    else:
        return render( request,"App.tsx")