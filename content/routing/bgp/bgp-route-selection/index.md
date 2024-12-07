+++
title = 'Route Selection'
date = 2024-12-01T09:15:27-05:00
draft = false
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

The Juniper default BGP preference is 170 below you can see a route selection which is based on a non-default route preference of 160.
Junos OS is kind enough to tell us why the second route has lost in the route selection.  
> The Inactive Reason is **Route Preference**

```
jcluser@vMX4# run show route 192.168.250.0/24 exact detail                

inet.0: 14 destinations, 15 routes (14 active, 0 holddown, 0 hidden)
192.168.250.0/24 (2 entries, 1 announced)
        *BGP    Preference: 160/-101
                Next hop type: Router, Next hop index: 595
                Address: 0xc4b5f5c
                Next-hop reference count: 2
                Source: 10.100.34.1
                Next hop: 10.100.34.1 via ge-0/0/1.0, selected
                Session Id: 0x141
                State: <Active Ext>
                Local AS: 64533 Peer AS: 64522
                Age: 7 
                Validation State: unverified 
                Task: BGP_64522.10.100.34.1
                Announcement bits (2): 0-KRT 4-BGP_RT_Background 
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.3
                Thread: junos-main 
         BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 596
                Address: 0xc4b5ef4
                Next-hop reference count: 1
                Source: 10.100.24.1
                Next hop: 10.100.24.1 via ge-0/0/0.0, selected
                Session Id: 0x140
                State: <Ext>
                Inactive reason: Route Preference
                Local AS: 64533 Peer AS: 64522
                Age: 9:18 
                Validation State: unverified 
                Task: BGP_64522.10.100.24.1
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.2
                Thread: junos-main 
```

## Highest Local Preference 

The default BGP **Local Preference** is 100 the route below has been selected for its higher non-default value of **200**. 
> The Inactive Reason is **Local Preference**

```
jcluser@vMX4# run show route 192.168.250.0/24 exact detail 

inet.0: 14 destinations, 15 routes (14 active, 0 holddown, 0 hidden)
192.168.250.0/24 (2 entries, 1 announced)
        *BGP    Preference: 170/-201
                Next hop type: Router, Next hop index: 595
                Address: 0xc4b5f5c
                Next-hop reference count: 2
                Source: 10.100.34.1
                Next hop: 10.100.34.1 via ge-0/0/1.0, selected
                Session Id: 0x141
                State: <Active Ext>
                Local AS: 64533 Peer AS: 64522
                Age: 24 
                Validation State: unverified 
                Task: BGP_64522.10.100.34.1
                Announcement bits (2): 0-KRT 4-BGP_RT_Background 
                AS path: 64522 I 
                Accepted
                Localpref: 200
                Router ID: 10.100.100.3
                Thread: junos-main 
         BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 596
                Address: 0xc4b5ef4
                Next-hop reference count: 1
                Source: 10.100.24.1
                Next hop: 10.100.24.1 via ge-0/0/0.0, selected
                Session Id: 0x140
                State: <Ext>
                Inactive reason: Local Preference
                Local AS: 64533 Peer AS: 64522
                Age: 51:52 
                Validation State: unverified 
                Task: BGP_64522.10.100.24.1
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.2
                Thread: junos-main 
```

## Shortest AS Path 

The route below has been selected because of its shortest AS Path.  
The selected route has 1 AS vs 5 AS.   
 
> The Inactive Reason is **AS Path**

```
jcluser@vMX4# run show route 192.168.250.0/24 exact detail 

inet.0: 14 destinations, 15 routes (14 active, 0 holddown, 0 hidden)
192.168.250.0/24 (2 entries, 1 announced)
        *BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 596
                Address: 0xc4b5ef4
                Next-hop reference count: 2
                Source: 10.100.24.1
                Next hop: 10.100.24.1 via ge-0/0/0.0, selected
                Session Id: 0x140
                State: <Active Ext>
                Local AS: 64533 Peer AS: 64522
                Age: 1:23:04 
                Validation State: unverified 
                Task: BGP_64522.10.100.24.1
                Announcement bits (2): 0-KRT 4-BGP_RT_Background 
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.2
                Thread: junos-main 
         BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 595
                Address: 0xc4b5f5c
                Next-hop reference count: 1
                Source: 10.100.34.1
                Next hop: 10.100.34.1 via ge-0/0/1.0, selected
                Session Id: 0x141
                State: <Ext>
                Inactive reason: AS path
                Local AS: 64533 Peer AS: 64522
                Age: 15 
                Validation State: unverified 
                Task: BGP_64522.10.100.34.1
                AS path: 64522 64522 64522 64522 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.3
                Thread: junos-main 
```

## Lowest Origin 

The active route is chosen based on its lower origin setting of I (IGP), compared to the second route which has an origin of ? (Incomplete). 

> The inactive reason is **Origin**

```
jcluser@vMX4# run show route 192.168.250.0/24 exact detail    

inet.0: 14 destinations, 15 routes (14 active, 0 holddown, 0 hidden)
192.168.250.0/24 (2 entries, 1 announced)
        *BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 596
                Address: 0xc4b5ef4
                Next-hop reference count: 2
                Source: 10.100.24.1
                Next hop: 10.100.24.1 via ge-0/0/0.0, selected
                Session Id: 0x140
                State: <Active Ext>
                Local AS: 64533 Peer AS: 64522
                Age: 1:45:36 
                Validation State: unverified 
                Task: BGP_64522.10.100.24.1
                Announcement bits (2): 0-KRT 4-BGP_RT_Background 
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.2
                Thread: junos-main 
         BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 595
                Address: 0xc4b5f5c
                Next-hop reference count: 1
                Source: 10.100.34.1
                Next hop: 10.100.34.1 via ge-0/0/1.0, selected
                Session Id: 0x141
                State: <Ext Changed>
                Inactive reason: Origin
                Local AS: 64533 Peer AS: 64522
                Age: 10 
                Validation State: unverified 
                Task: BGP_64522.10.100.34.1
                AS path: 64522 ? 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.3
                Thread: junos-main 
```


## Lowest MED

The active route has a MED value of 20. This is shown as metric in the output. The second route has a MED of 100 and this results in the inactive reason showing Not Best in its group - Route Metric or MED comparison.

> Inactive reason **Not Best in its group - Route Metric or MED comparison**

```
jcluser@vMX4# run show route 192.168.250.0/24 exact detail    

inet.0: 14 destinations, 15 routes (14 active, 0 holddown, 0 hidden)
192.168.250.0/24 (2 entries, 1 announced)
        *BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 596
                Address: 0xc4b5ef4
                Next-hop reference count: 2
                Source: 10.100.24.1
                Next hop: 10.100.24.1 via ge-0/0/0.0, selected
                Session Id: 0x140
                State: <Active Ext>
                Local AS: 64533 Peer AS: 64522
                Age: 1:55:20 
                Validation State: unverified 
                Task: BGP_64522.10.100.24.1
                Announcement bits (2): 0-KRT 4-BGP_RT_Background 
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.2
                Thread: junos-main 
         BGP    Preference: 170/-101
                Next hop type: Router, Next hop index: 595
                Address: 0xc4b5f5c
                Next-hop reference count: 1
                Source: 10.100.34.1
                Next hop: 10.100.34.1 via ge-0/0/1.0, selected
                Session Id: 0x141
                State: <NotBest Ext Changed>
                Inactive reason: Not Best in its group - 
                                 Route Metric or MED comparison
                Local AS: 64533 Peer AS: 64522
                Age: 5 Metric: 20 
                Validation State: unverified 
                Task: BGP_64522.10.100.34.1
                AS path: 64522 I 
                Accepted
                Localpref: 100
                Router ID: 10.100.100.3
                Thread: junos-main 
```

## Route Type 

The active route is selected because the strictly external route is preferred over the external route learned through an internal neighbor. Have a look at the Local AS and Peer AS line, this gives information on if the route is learned from an I-BGP neighbor or an E-BGP neighbor. The second route is inactive and the inactive reason shown is Interior > Exterior > Exterior via Interior.
So the order here is interior routes (local redistributed routes into BGP), then strictly external routes (directly learned from E-BGP peers), and lastly external routes learned through internal peers.


## Lowest IGP cost

The active route is chosen based on the lowest IGP cost to the BGP next-hop, shown as protocol next-hop in the output. The IGP cost is shown as metric2 in the output. The active route has a metric2 of 5. The inactive route has a metric2 of 10. The inactive reason given is Not Best in its group - IGP metric


## Lowest R-ID or Oldest Active

This step is different for internal sessions compared to external sessions. Examples of both I-BGP and E-BGP are shown below.

The first output shows the behavior for internal sessions. For internal sessions the lowest router-id is used as the tie-breaker. The inactive route has a router-id 192.168.2.2 which is higher than the 192.168.2.2 router-id of the active route. The inactive reason given is Not Best in its group - Router ID.

BGP Router ID

For external sessions the default behavior is to stay on the current active route for stability reasons. The inactive reason given in this scenario is Not Best in its group - Active preferred

BGP E-BGP Oldest

 

The default behavior for external sessions can be changed using the path-selection external-router-id command. When this option is configured the external session will use the router-id as the tie-breaker (just like it does for internal sessions). The inactive reason given is Not Best in its group - Router ID.

BGP E-BGP Router id - external router-id



## Cluster List

Only in the case of I-BGP learned routes and the use of route reflection will point 9 become a potential selection tie-breaker. The shortest cluster list will be preferred at this point, a missing cluster list is seen as a lenght of 0 so always preferred.

In the output below the active route has no cluster list whereas the inactive route has a cluster list length of 1 (192.168.2.1). The inactive reason given is Not Best in its group - Cluster list length


## Lowest Peer IP


The ultimate tie-breaker is needed when 2 routers peer 2 or more times with each other. This is typically done for load-balancing purposes. The router-id in step 8 can't be used as it will be the same for all the peering sessions.

The active route has the lowest peer ip address, shown as Source in the output. The inactive reason given is Not Best in its group - Update source
