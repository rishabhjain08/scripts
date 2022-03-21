# Importing the PIL library
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

def drawBase():
	# Open an Image
	img = Image.open('1099.png')

	# Call draw Method to add 2D graphics in an image
	I1 = ImageDraw.Draw(img)
	 
	font = ImageFont.truetype("arial.ttf", 25)
	text = 'Wealthfront Brokerage LLC\n'
	text += '261 Hamilton Ave\n'
	text += 'Palo Alto, CA 94301\n'
	text += 'Customer Service: 844-995-8437'
	I1.text((126, 129), text, fill=(0, 0, 0), font=font)

	text = '27-1967207' 
	I1.text((142, 307), text, fill=(0, 0, 0), font=font)

	text = '848-78-2941' 
	I1.text((410, 307), text, fill=(0, 0, 0), font=font)

	text = 'Rishabh Jain' 
	I1.text((142, 410), text, fill=(0, 0, 0), font=font)

	text = '97 3rd Ave, Apt. 2F'
	I1.text((142, 479), text, fill=(0, 0, 0), font=font)

	text = 'NEW YORK, NY 10003'
	I1.text((142, 561), text, fill=(0, 0, 0), font=font)

	text = '8W351354'
	I1.text((142, 620), text, fill=(0, 0, 0), font=font)

	text = 'New York'
	I1.text((142, 720), text, fill=(0, 0, 0), font=font)

	text = '0'
	I1.text((468, 720), text, fill=(0, 0, 0), font=font)

	# Display edited image
	img.show()
	 
	# Save the edited image
	img.save("1099-test.png")

def drawTick(I1, x, y):
	offset = 10
	shape = [(x, y), (x+offset, y-offset)]
	I1.line(shape, fill =(0, 0, 0), width = 5)
	shape = [(x, y), (x-(offset/2.0), y-(offset/2.0))]
	I1.line(shape, fill =(0, 0, 0), width = 5)

with open('1099.csv', 'r') as f:
	csv = f.read()

ind = 0
for line in csv.split('\n'):
	bits = line.split(',')
	# Open an Image
	img = Image.open('1099-test.png')

	# Call draw Method to add 2D graphics in an image
	I1 = ImageDraw.Draw(img)
	 
	font = ImageFont.truetype("arial.ttf", 20)
	text = bits[0]
	ind = text.find(' ')
	text = text[:ind] + ' sh. ' + text[(ind + 1):]
	I1.text((635, 200), text, fill=(0, 0, 0), font=font)

	text = bits[1]
	I1.text((635, 254), text, fill=(0, 0, 0), font=font)

	text = bits[2]
	I1.text((848, 254), text, fill=(0, 0, 0), font=font)

	text = bits[3]
	I1.text((635, 300), text, fill=(0, 0, 0), font=font)

	text = bits[4]
	I1.text((848, 300), text, fill=(0, 0, 0), font=font)

	text = bits[5]
	if text == 'W':
		I1.text((848, 353), bits[6], fill=(0, 0, 0), font=font)
	else:
		I1.text((635, 353), bits[6], fill=(0, 0, 0), font=font)

	I1.text((635, 481), '0', fill=(0, 0, 0), font=font)

	I1.text((635, 626), '0.00', fill=(0, 0, 0), font=font)
	I1.text((848, 626), '0.00', fill=(0, 0, 0), font=font)
	I1.text((635, 700), '0.00', fill=(0, 0, 0), font=font)
	I1.text((848, 700), '0.00', fill=(0, 0, 0), font=font)

	if bits[8].lower().find('short') != -1:
		drawTick(I1, 803, 387)
	else:
		drawTick(I1, 802, 411)

	# Net proceed
	drawTick(I1, 802, 562)
	
	# Cost basis reported
	drawTick(I1, 792, 762)

	img.show()
	 
	# Save the edited image
	img.save('1099-' + str(ind) + '.png')
	ind += 1
	break
