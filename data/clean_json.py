import json
import simplejson

# read all files in
out = []

# loop through file, filter for the features, place each element in a list
with open('bobbleheads.json') as f:
    bobbleheads = json.load(f)
    for row in bobbleheads['features']:
        out.append(row)

with open('fusioncores.json') as f:
    fusioncores = json.load(f)
    for row in fusioncores['features']:
        out.append(row)

with open('hardpoints.json') as f:
    hardpoints = json.load(f)
    for row in hardpoints['features']:
        out.append(row)

with open('mapmarkers.json') as f:
    mapmarkers = json.load(f)
    for row in mapmarkers['features']:
        out.append(row)

with open('powerarmors.json') as f:
    powerarmors = json.load(f)
    for row in powerarmors['features']:
        out.append(row)

with open('workshops.json') as f:
    workshops = json.load(f)
    for row in workshops['features']:
        out.append(row)


# build outfile
outfile = open('data.json', 'w')

# write magic collection string
outfile.write('{"type":"FeatureCollection","Features":[')

# to not write a comma on the final line
i=1
e=len(out)

# json encode row and dump
for row in out:
    outfile.write(simplejson.dumps(row))
    if(i<e):
        outfile.write(',')
    i+=1

# end of feature collection line
outfile.write(']}')

# close file
outfile.close()