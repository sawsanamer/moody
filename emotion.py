
import cv2
from deepface import DeepFace
import sys
picture_name=sys.argv[1]
image = cv2.imread("C:\\Users\\sawsan\\downloads\\"+picture_name)
result = DeepFace.analyze(image, actions=['emotion'])
print(result['dominant_emotion'])
sys.stdout.flush()