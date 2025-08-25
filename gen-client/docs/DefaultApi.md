# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**patchTask**](#patchtask) | **PATCH** /tasks/{id} | Partially update a task|

# **patchTask**
> Task patchTask(updateTaskDto)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskDto
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: number; // (default to undefined)
let updateTaskDto: UpdateTaskDto; //

const { status, data } = await apiInstance.patchTask(
    id,
    updateTaskDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskDto** | **UpdateTaskDto**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Task**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Updated task |  -  |
|**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

