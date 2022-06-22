import matplotlib.pyplot as plt
import numpy as np
import pydicom as pd
from pydicom import dcmread
from bresenham import bresenham

def setDicomWinWidthWinCenter(img_data, winwidth, wincenter, rows, cols):
    img_temp = img_data
    img_temp.flags.writeable = True
    min = (2 * wincenter - winwidth) / 2.0 + 0.5
    max = (2 * wincenter + winwidth) / 2.0 + 0.5
    dFactor = 255.0 / (max - min)

    for i in np.arange(rows):
        for j in np.arange(cols):
            img_temp[i, j] = int((img_temp[i, j]-min)*dFactor)

    min_index = img_temp < 0
    img_temp[min_index] = 0
    max_index = img_temp > 255
    img_temp[max_index] = 255

    return img_temp

# def drawBone(img):
# a = [(149, 271), (150, 271), (152, 270), (153, 270), (155, 269), (157, 268), (163, 262), (166, 260), (170, 257), (174, 254), (176, 253), (178, 251), (180, 250), (183, 249), (188, 246), (188, 245), (188, 244), (187, 244), (184, 244), (184, 244), (182, 245), (180, 246), (179, 247), (176, 249), (175, 250), (175, 251), (174, 251), (172, 252), (171, 252), (169, 254), (167, 255), (167, 256), (164, 257), (159, 260), (156, 261), (153, 263), (151, 264), (147, 265), (146, 266), (146, 267), (146, 267), (146, 268), (146, 269), (147, 270), (148, 271)]
a = [(268, 250), (268, 250), (269, 249), (269, 249), (270, 249), (271, 249), (272, 250), (272, 250), (273, 251), (274, 251), (274, 251), (274, 252), (275, 252), (275, 253), (276, 253), (277, 254), (277, 254), (278, 255), (278, 255), (279, 256), (280, 256), (280, 257), (280, 257), (281, 257), (282, 258), (282, 258), (283, 259), (283, 259), (284, 260), (284, 260), (284, 261), (285, 262), (285, 263), (285, 263), (285, 265), (285, 265), (285, 266), (286, 267), (286, 268), (286, 268), (287, 269), (287, 269), (287, 270), (286, 271), (286, 272), (286, 272), (286, 273), (285, 274), (285, 274), (284, 275), (284, 275), (283, 276), (283, 277), (283, 277), (282, 277), (281, 278), (281, 278), (280, 278), (279, 279), (278, 279), (278, 279), (277, 280), (276, 280), (275, 280), (274, 280), (274, 280), (273, 280), (272, 280), (271, 281), (270, 281), (269, 281), (269, 281), (268, 281), (267, 280), (266, 280), (266, 280), (265, 279), (265, 279), (264, 278), (264, 278), (263, 277), (263, 277), (262, 276), (262, 275), (262, 275), (261, 274), (260, 274), (260, 274), (259, 273), (259, 273), (258, 272), (257, 272), (257, 271), (257, 271), (256, 271), (255, 270), (254, 270), (254, 270), (253, 270), (252, 271), (251, 271), (251, 271), (251, 272), (250, 273), (250, 273), (249, 274), (249, 274), (249, 275), (248, 276), (248, 276), (247, 277), (247, 277), (246, 278), (246, 278), (245, 279), (245, 279), (244, 279), (243, 280), (242, 280), (242, 280), (241, 280), (240, 281), (240, 281), (239, 281), (238, 282), (238, 282), (237, 283), (236, 283), (236, 283), (235, 283), (234, 283), (234, 284), (233, 283), (232, 283), (231, 283), (231, 283), (230, 283), (229, 282), (229, 282), (228, 281), (227, 281), (227, 281), (226, 280), (225, 280), (225, 280), (225, 279), (224, 278), (224, 278), (223, 277), (222, 277), (222, 277), (222, 276), (221, 275), (221, 275), (220, 274), (220, 273), (220, 273), (219, 272), (219, 271), (219, 270), (219, 269), (219, 269), (219, 268), (219, 267), (219, 266), (219, 265), (220, 264), (220, 264), (221, 263), (221, 263), (222, 263), (223, 262), (224, 262), (224, 262), (225, 262), (226, 261), (227, 261), (228, 261), (228, 261), (230, 261), (230, 261), (231, 261), (232, 260), (233, 260), (233, 260), (234, 259), (234, 259), (235, 259), (236, 258), (236, 258), (237, 257), (237, 257), (238, 257), (238, 256), (239, 255), (239, 255), (240, 254), (240, 254), (240, 253), (241, 253), (242, 252), (243, 252), (243, 252), (244, 252), (245, 252), (246, 253), (246, 253), (247, 254), (248, 254), (248, 254), (248, 255), (249, 255), (250, 256), (250, 256), (251, 257), (251, 257), (252, 257), (253, 258), (253, 258), (254, 259), (255, 259), (256, 259), (256, 259), (257, 259), (258, 258), (258, 258), (259, 257), (260, 257), (260, 257), (261, 256), (262, 256), (262, 256), (263, 255), (263, 254), (263, 254), (264, 254), (265, 253), (265, 252), (266, 252), (266, 251), (266, 251), (267, 251)]

a.append(a[0])
i = 0
b = []
while i < len(a) - 1:
    b = b + list(bresenham(a[i][0], a[i][1], a[i+1][0], a[i+1][1]))
    i = i + 1

c = []
 
for element in b:
    if element not in c:
        c.append(element)

print(c)


for item in c:
    plt.plot(item[0], item[1], marker='o', color="magenta", markersize=0.25) 


ctFile = 'Initial_Files\CT+2RTS\$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1\CT_1.2.840.113704.7.1.0.18317622184172152.1648135231.338.dcm'
ds = dcmread(ctFile)
img = ds.pixel_array * ds.RescaleSlope + ds.RescaleIntercept

image = setDicomWinWidthWinCenter(img, 1800, 400, len(img), len(img))

plt.imshow(image, 'gray')
plt.axis('off')
plt.savefig('test.jpg', bbox_inches='tight', pad_inches=0, dpi=138.7)
plt.close()