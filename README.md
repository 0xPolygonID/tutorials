# Polygon ID Tutorials

## Check the documentation

The documentation is available at [0xPolygon.github.io](https://0xpolygonid.github.io/tutorials/)

## Run the documentation locally

### Install Python

Download the latest version of Python [here](https://www.python.org/downloads/). By default, the Python binary file is stored in `usr/local/bin` directory on Mac. 

To view the version of the Python installed on your system, copy the path where your Python Installer is located and paste it to the Terminal:

```
/usr/local/bin/python3.10
```
It shows the version of Python and the date on which it was installed:

```
Python 3.10.7 (v3.10.7:6cc6b13308, Sep  5 2022, 14:02:52) [Clang 13.0.0 (clang-1300.0.29.30)] on darwin
```

### Install mkdocs
```
pip3 install mkdocs
```

In case you have a rendering problem with the pieces of code, please execute:
```
pip3 install --upgrade mkdocs
```

### Install graphviz

Ubuntu:
```
sudo apt-get install graphviz
```

For other platforms see: https://graphviz.org/download/

### Install plugins

```
pip3 install mkdocs-mermaid2-plugin
pip3 install mkdocs-graphviz
pip3 install mkdocs-video
```

### Clone the repository
Using this link https://github.com/0xPolygonID/tutorials.git, clone the repository in your local machine.

### Run the webserver
Find the folder where the repository is installed in your computer and change the directory to 'mkdocs'.

```
cd mkdocs
```

At the mkdocs directory, execute:

```
mkdocs serve
```
This starts the webserver locally on your machine:
```
INFO     -  Building documentation...
INFO     -  MERMAID2  - Initialization arguments: {}
INFO     -  MERMAID2  - Using javascript library (8.8.0):
               https://unpkg.com/mermaid@8.8.0/dist/mermaid.min.js
INFO     -  Cleaning site directory

Serving on http://127.0.0.1:8000/polygon-id/
```
