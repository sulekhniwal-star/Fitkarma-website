# 14 — Email Templates (English and Hindi Drafts)

All copy is draft and must be reviewed by the owner. Hindi must receive native-editor review. Templates must use the same status as the database and must not imply a place before allocation succeeds.

## 1. Verification email — English

**Subject:** Verify your email for the FitKarma beta

Hi {{first_name}},

Thanks for applying to the FitKarma beta programme. Please verify your email address using the button below to complete your application:

**Verify my email**

This link is personal, one-time use and expires after the configured period. If you did not request this, you can ignore this email.

— Team FitKarma

## 2. Verification email — Hindi

**विषय:** FitKarma बीटा के लिए अपना ईमेल सत्यापित करें

नमस्ते {{first_name}},

FitKarma बीटा कार्यक्रम में आवेदन करने के लिए धन्यवाद। अपना आवेदन पूरा करने के लिए नीचे दिए गए बटन से ईमेल पता सत्यापित करें:

**मेरा ईमेल सत्यापित करें**

यह लिंक व्यक्तिगत है, एक बार ही उपयोग किया जा सकता है और निर्धारित समय के बाद समाप्त हो जाएगा। यदि आपने यह अनुरोध नहीं किया है, तो इस ईमेल को अनदेखा कर सकते हैं।

— FitKarma टीम

## 3. Phase 1 accepted — English

**Subject:** You're in! Your FitKarma Phase 1 VIP Beta Pass (#{{seat_number}})

Hi {{first_name}},

Congratulations — your email has been verified and you have secured an official place in the FitKarma Phase 1 beta.

**Your Reserved Seat:** `VIP SEAT #{{seat_number}}` (out of 1,000)  
**Reference ID:** `{{application_reference}}`

### Your VIP Beta Pass Card
You can view, download, and share your digital pass card anytime here:  
**[View My VIP Beta Pass]({{pass_url}})**

We will notify you by email as soon as beta access opens. FitKarma features will roll out progressively to Phase 1 participants.

Thank you for being part of the first 1,000 shaping India's AI-powered wellness ecosystem.

— Team FitKarma

## 4. Phase 1 accepted — Hindi

**विषय:** बधाई हो! आपका FitKarma Phase 1 VIP बीटा पास (#{{seat_number}})

नमस्ते {{first_name}},

बधाई हो — आपका ईमेल सत्यापित हो चुका है और FitKarma Phase 1 बीटा में आपका स्थान सुरक्षित हो गया है।

**आपका आरक्षित स्थान:** `VIP SEAT #{{seat_number}}` (कुल 1,000 में से)  
**संदर्भ संख्या:** `{{application_reference}}`

### आपका डिजिटल VIP बीटा पास
आप अपना डिजिटल पास कार्ड यहाँ देख, डाउनलोड और शेयर कर सकते हैं:  
**[मेरा VIP बीटा पास देखें]({{pass_url}})**

बीटा एक्सेस शुरू होने पर हम आपको ईमेल द्वारा सूचित करेंगे। Phase 1 सदस्यों के लिए सुविधाएँ चरणबद्ध तरीके से जारी की जाएँगी।

भारत के पहले AI-संचालित वेलनेस इकोसिस्टम का हिस्सा बनने के लिए धन्यवाद।

— FitKarma टीम

FitKarma को बेहतर बनाने में मदद करने के लिए धन्यवाद।

— FitKarma टीम

## 5. Phase 2 waitlist — English

**Subject:** You're on the FitKarma Phase 2 waitlist

Hi {{first_name}},

Your email is verified. Phase 1 has reached its 1,000-place limit, so we've added your application to the FitKarma Phase 2 waitlist.

We'll email you when Phase 2 applications or invitations open. This is a waitlist confirmation, not a Phase 1 beta seat.

— Team FitKarma

## 6. Phase 2 waitlist — Hindi

**विषय:** आप FitKarma Phase 2 प्रतीक्षा सूची में हैं

नमस्ते {{first_name}},

आपका ईमेल सत्यापित हो गया है। Phase 1 की 1,000 स्थानों की सीमा पूरी हो चुकी है, इसलिए आपका आवेदन FitKarma Phase 2 की प्रतीक्षा सूची में जोड़ दिया गया है।

Phase 2 के आवेदन या निमंत्रण शुरू होने पर हम आपको ईमेल करेंगे। यह प्रतीक्षा सूची की पुष्टि है, Phase 1 बीटा स्थान की पुष्टि नहीं।

— FitKarma टीम

## 7. Phase 2 share invitation to Phase 1 registrants — English

**Subject:** Help more people discover FitKarma — Phase 2 is opening

Hi {{first_name}},

Thank you for being part of the first FitKarma beta cohort. We're opening the next phase of the programme.

You can share this application link with friends or family who may want to join:

{{phase2_public_url}}

Each applicant must complete their own application and email verification. Places, if limited, will be allocated under the published Phase 2 rules.

Thank you for helping us build a better health and wellness experience for India.

— Team FitKarma

## 8. Phase 2 share invitation — Hindi

**विषय:** FitKarma को और लोगों तक पहुँचाएँ — Phase 2 शुरू हो रहा है

नमस्ते {{first_name}},

FitKarma के पहले बीटा समूह का हिस्सा बनने के लिए धन्यवाद। अब हम कार्यक्रम का अगला चरण शुरू कर रहे हैं।

जो मित्र या परिवारजन FitKarma से जुड़ना चाहते हैं, उनके साथ यह आवेदन लिंक साझा कर सकते हैं:

{{phase2_public_url}}

हर आवेदक को अपना आवेदन और ईमेल सत्यापन पूरा करना होगा। सीमित स्थान होने पर आवंटन Phase 2 के घोषित नियमों के अनुसार होगा।

भारत के लिए बेहतर health और wellness अनुभव बनाने में मदद के लिए धन्यवाद।

— FitKarma टीम

## Template implementation rules

- Escape all interpolated values.
- Use allowlisted absolute URLs from server configuration, never an arbitrary user-provided URL.
- Do not include seat number unless owner wants it public; application reference is safer.
- No access date promise unless approved and operationally confirmed.
- Never include password, OTP, auth token, medical data or private admin information in email logs.
- Send Phase 2 share campaign only after explicit owner approval and only to eligible Phase 1 recipients.
