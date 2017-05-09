Fuzzy dates are found on entities with date-like properties where the complete date may be unknown. They are represented in the {{ stache.config.api_type_name }} as a JSON object with 3 fields for the year, month, and day components: `y`,`m`,`d`.

Fuzzy date fields generally allow the following formats:
- month, day, and year
- month and year
- year only

Some entities may support additional formats, so be sure to reference the specific documentation for an endpoint that accepts or returns a fuzzy date.

For example, the <a href="{{ stache.config.constituent_entity_reference }}#Constituent" target="_blank">constituent</a> entity `birthdate` field is a fuzzy date that supports "month and day" as well as the above formats.  In the below sample JSON representation, only the `y` property of the fuzzy date is shown which indicates that only the year value is known:

<pre><code class="language-http">Date: Tue, 24 May 2016 19:47:44 GMT
Content-Type: application/json; charset=utf-8

{
  "id": "280",
  "type": "individual",
  "lookup_id": "96",
  "inactive": false,
  "name": "Dr. Robert C. Hernandez",
  "last": "Hernandez",
  "first": "Robert",
  "middle": "Carlos",
  "nickname": "Bob",
  "title": "Dr.",
  "gender": "male",
  "birthdate": {
    "y": 1961
  }
}</code></pre>

The following example shows a partial collection of <a href="{{ stache.config.constituent_entity_reference }}#Note" target="_blank">notes</a> for a constituent. The `date` property is a fuzzy date, and in the first note the value represented is June, 2007.

<pre><code class="language-http">Date: Tue, 24 May 2016 19:47:44 GMT
Content-Type: application/json; charset=utf-8

{
  "count": 25,
  "value": [
    {
      "id": "12",
      "type": "Address Changes",
      "date": {
        "y": 2007,
        "m": 6
      },
      "summary": "Vacation",
      "text": "Dr. Hernandez has purchased a vacation home in Arizona."
    },
    {
      "id": "10",
      "type": "Career",
      "date": {
        "y": 2006,
        "m": 6,
        "d": 11
      },
      "summary": "Opening of Pediatric Clinic with Partner",
      "text": "Dr. Hernandez plans to leave the pharmaceutical company to open a practice with his former colleague."
    }, ...
  ]
}</code></pre>

<p class="alert alert-info">Fuzzy dates are <em>not</em> traditional <a href="#date-formats" class="smooth-scroll">dates</a> and do <em>not</em> conform to the <a href="https://tools.ietf.org/html/rfc3339" target="_blank">ISO 8601</a> standard.</p>


For additional information about fuzzy dates, see the <a href="{{ stache.config.constituent_entity_reference }}#FuzzyDate" target="_blank">entity reference</a>.
