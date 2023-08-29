# Del 8

## Oppdater runtimen vår
Vi ønsker jo å kunne oppdatere koden vår som kjører. 

Legg til et nytt endepunkt i tjenesten din. Hva med et skikkelig treigt endepunt? Det kan vi jo kanskje bruke seinere. 

Legg til følgende funksjon og lag et nytt endepunkt hvor det kalles. Bygg, deploy og sjekk at det funker som forventet.

````js
function mySlowFunction(baseNumber) {
  console.time('mySlowFunction');
  let result = 0;
  for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  };
  console.timeEnd('mySlowFunction');
}
````
