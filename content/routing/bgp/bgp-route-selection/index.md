+++
title = 'Route Selection'
date = 2024-12-01T09:15:27-05:00
draft = true
tags = ["BGP","Routing","Juniper"]
featured_image = 'featured.png'
summary = 'How to influance the route selection with the approptiate attributes.'
+++


>Before the router even starts the route selection process it needs to make sure that the route is valid, checks the **Martian** routes, **AS loops** and **next-hop reachability**. 

## Best Path Selection

| Attribute                        | Preference   | Default Behavior                                    |
| :------------------------------- | :----------  | :-------------------------------------------------- |
| 1. Route Preference              | Lowest       | Default value is 170                                |
| 2. Local Preference              | Highest      | Default learned value is 100                        |
| 3. AS-Path                       | Shortest     | Usualy the first time route selection occurs        |
| 4. Origin                        | Lowest       | IGP (I) >  EGP (E), EGP > incomplete (?)            |
| 5. Multi Exit Discriminator (MED)| Lowest       | Compared when routes are learned from the same AS   |
| 6. Route Type                    | External     | Internal vs External, External prefered             |
| 7. IGP Cost                      | Lowest       | lowest cost towards the BGP next-hop                |
| 8. Internal vs External          | Lowest       | Lowest R-ID,  Oldest active route                   |
| 10. Cluster List                 | Shortest     | When route reflection is used                       |
| 11. Peer IP Address              | Lowest       | Multiple peerings between the same router           |


>For JUNOS the route selection results and criteria can be seen in the output of:  
- **show route details**
- **show route extensive**


## Lowest Route Preference

The output below shows the active 20.20.20/24 route having a non-default route preference of 169. The other learned route to 20.20.20/24 has a default BGP route preference of 170. Junos OS is verbose in the output showing us why the second route has lost in the route selection. The inactive reason given is Route Preference.

## Highest Local Preference 
## Shortest AS Path 
## Lowest Origin 
## Lowest MED
## Route Type 
## Lowest IGP cost
## Lowest R-ID or Oldest Active
## Cluster List
## Lowest Peer IP

