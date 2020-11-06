
import cv2
from deepface import DeepFace
import sys

image = cv2.imread("C:\\Users\\sawsan\\downloads\\download.png")
result = DeepFace.analyze(image, actions=['emotion'])
print(result['dominant_emotion'])
sys.stdout.flush()