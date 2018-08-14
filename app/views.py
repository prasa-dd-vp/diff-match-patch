from django.shortcuts import render
from django.template import loader
from django.http import JsonResponse
from django.http import HttpResponse
import diff_match_patch
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
        html = ""
        for i in diffs:
            if i[0] == 0:
                html += i[1]+"<br><br>"
                
            if i[0] == -1:
                html += """<strike>"""+i[1]+"""</strike><br><br>
                <button type="button" class="btn btn-success">Accept</button>
                <button type="button" class="btn btn-danger">Reject</button><br>"""   
                
            if i[0] == 1:
                html += """<u>"""+i[1]+"""</u><br><br>
                <button type="button" class="btn btn-success">Accept</button>
                <button type="button" class="btn btn-danger">Reject</button><br>"""
        print(html)
        return HttpResponse(html)