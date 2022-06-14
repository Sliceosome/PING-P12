import pydicom as pd
from pydicom import dcmread
import matplotlib.pyplot as plt
import numpy as np
# import cv2

ctPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\CT_1.2.840.113704.7.1.0.672206377134184.1648538072.2.dcm'
rtPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\RTSTRUCT_1.2.276.0.7230010.3.1.4.346818816.1878.1648539627.475662.dcm'

imgRGB = np.zeros([512, 512, 3], dtype=np.uint8)
# print("image  INIT: ", image)

ds = dcmread(ctPath)
# imgNorm = cv2.normalize(ds.pixel_array, None, alpha = 10, beta = 255, norm_type = cv2.NORM_MINMAX )
img = ds.pixel_array
print("min : ", np.min(img),"max : ", np.max(img))
imgRGB[:,:,0] = (img + 300) / 10
imgRGB[:,:,1] = (img + 300) / 10
imgRGB[:,:,2] = (img + 300) / 10
# print(ds.pixel_array)
# print("image RGB: ", image)


ds = dcmread(rtPath)
array = np.array(ds.ROIContourSequence[0].ContourSequence[247].ContourData).astype(int) - 256
splitArray = np.reshape(array, (int(len(array)/3),3))
print(splitArray)

R = 255
G = 0
B = 255

for point in splitArray:
    x = point[1]
    y = point[0]
    imgRGB[x,y,0] = R
    imgRGB[x,y,1] = G
    imgRGB[x,y,2] = B


plt.imshow(imgRGB)
plt.axis('off')
plt.savefig('./test' ,bbox_inches='tight', pad_inches=0, dpi=138.7)

