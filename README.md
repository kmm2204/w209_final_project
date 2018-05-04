# 2020 Hard to Count Visualization

## Data acquisition and requirements

We included data from several sources. 

* The census bureau's planning database. See [census planning database data](https://www.census.gov/research/data/planning_database/2016/).
* The FCC's internet access data. See [FCC data](https://www.fcc.gov/general/form-477-census-tract-data-internet-access-services).
* The census bureau's American Community Survey(ACS) 5 year estimates from the census bureau's API [ACS data](https://www.census.gov/data/developers/data-sets/acs-5year.html).
* Requirements: python 3.6, pandas, numpy, geopandas, requests, matplotlib, Tableau 10.5

## Data cleaning aggregation

The data folder also has a file called "Data_pipeline.ipynb"

* "Data pipeline" has the code for calling census bureau's API for the ACS data by census tract and state and aggregating it. 
* "Data pipeline" combines the ACS data with all of the other data by using the census bureau's GEOID's.
* "Data pipeline" will export a csv called "Master.csv"

## Uploading "Master.csv" to Tableau

* Tableau 10.5 was used to make this visualization.
* Once you have the "Master.csv" file, import this file into Tableau.
* We have posted our Tableau dashboard publicly. You can download it here: [Tableau dashboard](https://public.tableau.com/profile/robert.deng#!/vizhome/HTC_Final_Project/HTCStory?publish=yes)

## Publishing to a website

* Additional files needed to publish our dashboard to a website are in the website folder.


### Note on the Bokeh folder
* While this project did not end up using Bokeh for our final project, we have included plotting by the county level in bokeh for all of our hard to count metrics. 
* We ultimately decided against Bokeh due to load times, but the fully functional code is posted in the /Bokeh folder. 




