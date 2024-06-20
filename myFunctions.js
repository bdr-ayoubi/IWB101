
const check_box =$(".details-toggle");
check_box.click(function (){
    if($(this).is(":checked")) {
          const this_checked=this.dataset.house;
          const this_deteils=$("#property-details"+this_checked)
          const this_image = $("#property-image" + this_checked);
this_deteils.slideToggle();
this_image.slideToggle();
    }else{ const this_checked=this.dataset.house;
          const this_deteils=$("#property-details"+this_checked)
          const this_image = $("#property-image" + this_checked);
this_deteils.slideToggle();
this_image.slideToggle();
}});


function showForm() {
    
    if($('input[name="option"]:checked').val())
   { document.getElementById('property-form').style.display = 'block';
$(".property-form").css({ position: "fixed",
top: 300, 
width: "50%", 
zIndex: 1000 
});}
else {document.getElementById('property-form').style.display = 'none';
alert("لم تختر منزل, يرجى الاختيار ");}
}
// إغلاق الرسالة المنبثقة
function closePopup() {
    var popup = document.getElementById('popup-message');
    popup.style.display = 'none';
    var form=document.getElementById('property-form');
    form.style.display='none';
}

$(document).ready(function() {
     $('#application-form').submit(function(event) {
      
        event.preventDefault();
        
        var fullName = $('#fullname').val();
        var nationalID = $('#national-id').val();
        var dob = $('#dob').val();
        var mobile = $('#mobile').val();
        var email = $('#email').val();
        var captcha = $('#captcha-container').val();

       

        var isValid = true;

        // التحقق من الاسم الكامل
        if (!/^[\u0621-\u064A\s]+$/.test(fullName)) {
            alert("الاسم الكامل يجب أن يحتوي على أحرف هجائية فقط.");
            isValid = false;
        }

        // التحقق من الرقم الوطني
        if (!/^(0[1-9]|1[0-4])[0-9]{9}$/.test(nationalID)) {
            alert("الرقم الوطني يجب أن يتكون من 11 رقم ويتضمن ببدايته (01-02-03-04-05-06-07-08-09-10-11-12-13-14).");
            isValid = false;
        }

        // التحقق من رقم الموبايل
        if (!/^09(3[3-9]|4[4-9]|5[0-9]|9[0-9])\d{6}$/.test(mobile)) {
            alert("رقم الموبايل غير صالح.");
            isValid = false;
        }

        // التحقق من البريد الإلكتروني (اختياري)
        if (email !== "" && !/^[^ ]+@[^ ]+\.[a-z]{2,6}$/.test(email)) {
            alert("البريد الإلكتروني غير صالح.");
            isValid = false;
        }
     

    var enteredCaptcha = document.getElementById('captcha-input').value;
    var displayedCaptcha = document.getElementById('captcha-code').textContent;
   
    
    if (enteredCaptcha !== displayedCaptcha) {
        alert('رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
        $('#popup-message').css({display:'none'});
        isValid=false;
    } else if (enteredCaptcha == displayedCaptcha)
    { 
        alert('تم إرسال الطلب بنجاح!');
    }

        if (isValid) {            

            var selectedHouses = $('input[name="option"]:checked').map(function() {
                var house = $(this).closest('tr');
                var rentText = house.find('.dir').text();
                var details = house.find('td:nth-child(4)').text();
                var city = house.find('td:nth-child(5)').text();
                var rent =parseInt(rentText.replace(/\D/g,''));
                return {
                    rent: rent,
                    details: details,
                    city: city
                };
            }).get();

            // Display popup message
            var popupText = '';
            var totalrent=0;
            selectedHouses.forEach(function(property, index) {
                popupText += `العقار رقم ${index + 1}:<br>`;
                popupText += `الإيجار الشهري: ${property.rent.toLocaleString()}<br>`;
                popupText += `المدينة: ${property.city}<br>`;
                popupText += `تفاصيل: ${property.details}<br>`;
                popupText +=`<br>`;

                totalrent+=property.rent;
               
            });
            popupText += `المجموع الكلي للإيجار الشهري: ${totalrent.toLocaleString()} ل.س`;
            $('#popup-text').html(popupText);
            $('#popup-message').fadeIn();
        }
          
    });
});

// دالة لتوليد الرمز Captcha
function generateCaptcha() {
    var length = 4;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var captcha = "";
    
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        captcha += charset[randomIndex];
    }
    
    return captcha;
}

// دالة لعرض الرمز Captcha داخل العنصر النصي
function showCaptcha() {
    var captchaCode = generateCaptcha();
    var captchaSpan = document.getElementById('captcha-code');
    captchaSpan.textContent = captchaCode;
}

// دالة لتحديث الرمز Captcha عند الضغط على الزر "تحديث الرمز"
function refreshCaptcha() {
    showCaptcha();
}

// عرض الرمز Captcha عند تحميل الصفحة لأول مرة
document.addEventListener('DOMContentLoaded', showCaptcha);





