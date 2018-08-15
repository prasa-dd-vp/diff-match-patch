from django.shortcuts import render
from django.template import loader
from django.http import JsonResponse
from django.http import HttpResponse
import diff_match_patch
import json
# Create your views here.
def home(request):
    return render(request,'app/index.html')  

def html1(request):
    return render(request,'app/doc1.html')  

def html2(request):
    return render(request,'app/doc2.html') 

def html3(request):
    return render(request,'app/doc3.html')  
 

def doc1(request):
    if request.method == "POST":
        d1 = request.POST.get('d1')
        #print(d1)
        return HttpResponse(d1)
    
def doc2(request):
    if request.method == "POST":
        d2 = request.POST.get('d2')
        #print(d2)
        return HttpResponse(d2)

def diffMatchPatch(request):
    if request.method == "POST":
        str1 = request.POST.get('d1')
        #print(str1)
        str2 = request.POST.get('d2')
        #print(str2)
        dmp = diff_match_patch.diff_match_patch()
        dmp.Diff_Timeout = 0   # or some other value, default is 1.0 seconds
        diffs = dmp.diff_main(str1, str2)
        diffs_list = []
        for i in range(len(diffs)):
            diffs_list.append(list(diffs[i]))
        
        """for i in diffs:
            if i[0] == 0:
                same.append(i[1])    
                        
            if i[0] == -1:
                removed.append(i[1])   
                        
            if i[0] == 1:
                added.append(i[1])
        #print(same)
        #print(removed)
        #print(added)
        """
        dictt = {}
        dictt = {'diffs':diffs_list}
        #print(dictt)
        json_data = json.dumps(dictt)
        print(json_data)
        return JsonResponse(json_data, safe = False)
