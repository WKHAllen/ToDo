import eel
import os
import pickle

listFile = "data/list.dat"
theList = {}

@eel.expose
def loadList():
    if os.path.exists(listFile):
        with open(listFile, "rb") as f:
            data = pickle.load(f)
        for item in data:
            eel.appendRow(item)

def saveList():
    data = list(theList.values())
    splitPath = os.path.split(listFile)[0]
    if splitPath != "":
        os.makedirs(splitPath, exist_ok=True)
    with open(listFile, "wb") as f:
        pickle.dump(data, f)

@eel.expose
def listAppend(item, itemid):
    theList[itemid] = item
    saveList()

@eel.expose
def listRemove(itemid):
    del theList[itemid]
    saveList()

def main():
    eel.init("web")
    eel.start("main.html")

if __name__ == "__main__":
    main()
