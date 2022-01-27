
import cv2
from deepface import DeepFace
import sys
import os
picture_name=sys.argv[1]
image = cv2.imread(os.environ['STORAGE_LOCATION']+picture_name)
result = DeepFace.analyze(image, actions=['emotion'])
emotionsMapping = {
  "neutral": "calm",
  "angry": "angry",
    "happy": "happy",
    "surprise": "surprised",
    "sad": "sad",

}
dominant_emotion=result['dominant_emotion']
emotion="undetected"
if(dominant_emotion in emotionsMapping):
    emotion= emotionsMapping[dominant_emotion]
else:
    dict=result['emotion']
    dict = sorted(dict.items(), key=lambda x: x[1], reverse=True) 
    for key in dict:
        if (key[0] in emotionsMapping):
            emotion=emotionsMapping[key[0]]
            break


print(emotion)
sys.stdout.flush()