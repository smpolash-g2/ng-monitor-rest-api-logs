# Frontend Technical Test

The goal is to develop an interface to monitor REST APIs.

Monitoring is based on API access logs.

## Access logs

### Examples
```json
{
  "timestamp": 1704068277,
  "url": "https://example.com/path4?param2=piCm7fB&param3=XmU2wPB&param4=aRQOGl1",
  "status": 0,
  "response_time": 20
}
```

```json
{
  "timestamp": 1704096307,
  "url": "https://example.com/path2?param3=RHl5kC9&param4=vvrlmmH",
  "status": 2,
  "issue_type": 0,
  "issue_description": "Missing required parameter: param2",
  "response_time": 69
}
```
### Attributes

| name                | type   | required                                   | description                                                                                                                                                                 |
|---------------------|--------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timestamp`         | Number | yes                                        | Unix timestamp of the log in seconds                                                                                                                                        |
| `url`               | String | yes                                        | Request URL                                                                                                                                                                 |
| `response_time`     | Number | yes                                        | API response time in milliseconds                                                                                                                                           |
| `status`            | Number | yes                                        | Code corresponding to the request status:<ul><li>0: Success</li><li>1: Warning</li><li>2: Error</li></ul>                                                                                           |
| `issue_type`        | Number | Only when `status` is "Warning" or "Error" | Code corresponding to the warning or error encountered:<ul><li>0: Missing Parameter</li><li>1: Rate limit exceeded</li><li>2: Not Found</li><li>3: Unknown Parameter</li><li>4: Deprecated</li><li>5: Unsecure</li></ul>  |
| `issue_description` | String | Only when `status` is "Warning" or "Error" | Human readable details on the warning or error                                                                                                                              |

### Test Sample

A sample of logs spanning a one-month period is provided in this file: [access_logs.json](access_logs.json)

## Exercise requirements

Develop an Angular 17+ application to monitor access logs.

It should consist of:
- Selectors to filter access logs based on a combination of:
  - timestamp range
  - status
  - issue type
  - URL path (without query parameters)
  - response time range

- A stacked bar graph showing the number of requests per hour or per day based on selected filters. Hour/day granularity can be selected by the user.
Each bar of the graph is divided into 3 sections to show the proportion of requests statuses:
  - Green section: Success
  - Yellow section: Warning
  - Red section: Error

- A list of logs matching the filters, with infinite scroll

Please provide instructions to start the application with the sample data provided.

# Evaluation criteria

Your work will be evaluated based on:
- User experience quality
- Code performance
- Code clarity and maintainability

Note that this exercise is not about developing a graphical library from scratch; on the contrary, it is encouraged to use existing libraries when relevant.
