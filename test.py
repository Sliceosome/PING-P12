import cv2
import sys

im = cv2.imread(sys.argv[1],cv2.IMREAD_UNCHANGED)
print(im.shape)
print(im)