+++
title = 'Local Preference'
date = 2024-12-12T17:30:21-05:00
draft = true
tags = ["BGP","Routing","Juniper","Attributes"]
featured_image = 'featured.png'
summary = 'The Power of Local Preference. The first BGP attribute used to favor a one route over another.'
+++

### Local Preference Power

The BGP attribute of local preference is the highest tiebreaker in the BGP path selection process. If a BGP next hop is reachable, and BGP knows multiple routes, BGP always chooses the route with the highest local preference. Thus, local preference is the first BGP attribute that favors one path over another. 


### Highest Local Prefernce Wins

Highest Local Preference Wins Because of the position of the BGP local preference, neither the AS-path length, nor the origin code, nor the MED value matter. The route with the highest local-preference value is always chosen as the exit point of the AS-the end. 

All traffic from AS is following to the peer advertised to the highest local preference. 
Local Preference is transmitted only across iBGP peers
Local Preference can be used to direct all outbound traffic through a specific peer. 
influance incoming (inbound) or outgoing (outbound) traffic within the autonomous system. The Local Preference affects traffic only within the same AS. Applied on in the AS and not advertised to the external BGP peers. The routes inside the same AS will choose the route wirh the highest local preference to EXIT the AS. 