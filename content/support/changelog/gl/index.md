---
layout: layout-sidebar
name: General Ledger
description: Information on additions and changes for the General Ledger API.
order: 150
published: true
showInNav: true
icon: fa fa-book
back_to_top: true
title: General Ledger Changelog
---

# {{ name }}

Monitor this page to keep up with the [General Ledger API]({{ stache.config.portal_endpoints_GL }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2018-08-03

### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_cash_mgmt_list }}">
				<td>Cash management distribution set (List)</td>
				<td>GET</td>
				<td>/distributionsets/cashmanagement</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_cash_mgmt_get }}">
				<td>Cash management distribution set</td>
				<td>GET</td>
				<td>/distributionsets/cashmanagement/{set_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_cash_mgmt_post }}">
				<td>Cash management distribution set</td>
				<td>POST</td>
				<td>/distributionsets/cashmanagement/</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_cash_mgmt_edit }}">
				<td>Cash management distribution set</td>
				<td>PATCH</td>
				<td>/distributionsets/cashmanagement/{set_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_cash_mgmt_delete }}">
				<td>Cash management distribution set</td>
				<td>DELETE</td>
				<td>/distributionsets/cashmanagement/{set_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_set_list }}">
				<td>Transaction distribution set (List)</td>
				<td>GET</td>
				<td>/distributionsets/transaction</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_set_get }}">
				<td>Transaction distribution set</td>
				<td>GET</td>
				<td>/distributionsets/transaction/{set_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_set_post }}">
				<td>Transaction distribution set</td>
				<td>POST</td>
				<td>/distributionsets/transaction</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_set_edit }}">
				<td>Transaction distribution set</td>
				<td>PATCH</td>
				<td>/distributionsets/transaction/{set_id}</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_set_delete }}">
				<td>Transaction distribution set</td>
				<td>DELETE</td>
				<td>/distributionsets/transaction/{set_id}</td>
			</tr>
		</tbody>
	</table>
</div>

### Changed

- For the  [Journal entry batch - PATCH]({{ stache.config.portal_endpoints_journal_entry_batch_patch }}) endpoint, you can now edit the `batch_status` of unposted journal entry batches.
- For the  [Budget - PATCH]({{ stache.config.portal_endpoints_budget_patch }}) endpoint, you can now patch `notes` on budget lines.
- The  [Budget detail lines (List) - GET]({{ stache.config.portal_endpoints_budget_lines_list }}) endpoint now returns `notes` on budget lines.

## July

### 2018-07-19

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_detail }}">
				<td>Budget detail</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/details</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_patch }}">
				<td>Budget</td>
				<td>PATCH</td>
				<td>/budgets/{scenario_id}</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_lines_list }}">
				<td>Budget detail lines (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/details/lines</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

We made several changes to the  [Journal entry batch attachment]({{ stache.config.portal_endpoints_journal_entry_batch_attachment }}) endpoint:
- The endpoint now supports physical attachments. (Previously, it only supported link attachments.)
- Note the shape of the request in JSON form:
<pre class="language-javascript"><code>
{
  "parent_id": 0,
  "name": "string",
  "url": "string",
  "type": "Link",
  "media_type": "string",
  "file": {
    "ContentLength": 0,
    "ContentType": "string",
    "FileName": "string",
    "InputStream": {
      "CanRead": true,
      "CanSeek": true,
      "CanTimeout": true,
      "CanWrite": true,
      "Length": 0,
      "Position": 0,
      "ReadTimeout": 0,
      "WriteTimeout": 0
      }
   }
}
</code></pre>

- The `type` field now accepts `Physical` but defaults to `Link`.
- The `url` is required for link attachments but not for physical attachments
- <a href="https://msdn.microsoft.com/en-us/library/system.web.httppostedfilebase(v=vs.110).aspx">The `file` field is `HttpPostedFileBase`</a>. It is required for physical attachments but not for link attachments.
- For physical attachments, requests must be `multipart/form-data`. For example:

<pre class="language-javascript"><code>
public static Task<HttpResponseMessage> PostMultiPartDataFormAsync(this HttpClient client, string route, Attachment content)
        {
            var httpContent = new MultipartFormDataContent();
            var streamContent = new StreamContent(content.File.InputStream);
            var ContentDisposition = new ContentDispositionHeaderValue("form-data");
            ContentDisposition.Name = "File";
            ContentDisposition.FileName = content.File.FileName;
            streamContent.Headers.ContentDisposition = ContentDisposition;
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(content.File.ContentType);
            httpContent.Add(streamContent);
            httpContent.Add(new StringContent(content.ParentId.ToString()), "ParentId");
            httpContent.Add(new StringContent(content.Name), "Name");
            httpContent.Add(new StringContent(content.Type.ToString()), "Type");
            httpContent.Add(new StringContent(content.MediaType.ToString()), "MediaType");
            
            var request = new HttpRequestMessage(HttpMethod.Post, route)
            {
                Content = httpContent
            };
            return SendAsync(client, request);
        }

</code></pre>

- In `application/json` requests, field names must use snake casing such as `parent_id` and `media_type`, whereas in `multipart/form-data` requests, field names must use camel case, such as `ParentId` and `MediaType`.
- Link attachments should be sent as `application/json` formatted requests with the `file` field omitted.
- If the `file` field is populated in `application/json` formatted requests, the request fails unless `type` is set to `Link` because then the request ignores the file.


## June

### 2018-06-28

#### New

Added the following endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_summary_get }}">
				<td>Journal entry batch summary*</td>
				<td>GET</td>
				<td>/journalentrybatches/{batch_id}/summary</td>
			</tr>
		</tbody>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entries_list }}">
				<td>Journal entries (List)*</td>
				<td>GET</td>
				<td>/journalentrybatches/{batch_id}/journalentries</td>
			</tr>
		</tbody>
	</table>
</div>

<strong>&#42;</strong> We deprecated the [Journal entry batch (GET)]({{ stache.config.portal_endpoints_journal_entry_batch_get }}) endpoint and replaced it with the [Journal entry batch summary (Get)]({{ stache.config.portal_endpoints_journal_entry_batch_summary_get }}) and [Journal entries (List)]({{ stache.config.portal_endpoints_journal_entries_list }}) endpoints. We will continue to support deprecated endpoints for v1 of the General Ledger API, but we recommend transitioning to the new endpoints for a more robust and consistent response.

### 2018-06-20

#### Changed
We made changes to the following endpoints:

- The [Journal entry batch (List)]({{ stache.config.portal_endpoints_journal_entry_batch_list }}) endpoint now includes a new `search_text` request parameter that can match `description` or `ui_batch_id`. For example, `?search_text=100` returns a list of batches with a `ui_batch_id` that contains "100" or a `description` that contains "100".
- The [Budget (List)]({{ stache.config.portal_endpoints_budget_list }}) endpoint now includes a new `scenario_id` field that returns the scenario ID associated with the budget.

### 2018-06-12

#### Announcement: Changes for [General Ledger]({{ stache.config.portal_endpoints_GL }}) API

We implemented new operation ID values in the OpenApi (fka Swagger) definitions for all endpoints in the General Ledger API. Note that any existing code relying on these endpoints will continue to function, since all routes and parameters are unchanged. However, if you make use of client-side generated code and want to regenerate your client wrapper, compile-time errors in your code stemming from new operation ID values will arise and need to be addressed.

### 2018-06-04

#### Announcement: Changes Planned for [Accounts Payable]({{ stache.config.portal_endpoints_AP }}), [General Ledger]({{ stache.config.portal_endpoints_GL }}), and [Treasury (Beta)]({{ stache.config.portal_endpoints_treasury }}) APIs

We will implement new operation ID values in the OpenApi (fka Swagger) definitions for several SKY APIs. This change will improve client-side tooling support for code generation by making these values more deterministic and friendlier across different languages. Going forward, we expect high stability of these values (meaning, we won’t need to change them again).

Note that any existing code that has been deployed will continue to function with no problems, since we are not changing any routes or parameters. If you make use of client-side generated code and want to regenerate your client wrapper, you’ll need to fix any compile-time errors in your code stemming from new method names.

## May

### 2018-05-24

#### Changed
We made changes to the following endpoints:

- The [Transaction distribution (List)]({{ stache.config.portal_endpoints_transaction_distribution_search }}) endpoint now returns proper `account_class` information.
- The [Journal entry batch (GET)]({{ stache.config.portal_endpoints_journal_entry_batch_get }}) endpoint now returns the correct number of `journal_entries`.
- In the [Period summary process (GET)]({{ stache.config.portal_endpoints_period_summary_process }}) endpoint, the `status` field has been enumerated and all values can now be seen in the Period summary process schema.

## April

### 2018-04-20

#### New
Added the following endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_patch }}">
				<td>Journal entry batch</td>
				<td>PATCH</td>
				<td>/journalentrybatches/{batch_id}</td>
			</tr>
		</tbody>
	</table>
</div>

With the new endpoint, note the following:

- You can edit the `description`, `create_interfund_sets`, and `create_bank_account_adjustments` values of an existing journal entry batch.
- Posted journal entry batches cannot be edited.
- Omitting a field from a PATCH request does not edit that field with a default value. In the example below, only `create_interfund_entries` is edited, but the other fields are not.

<pre class="language-javascript"><code>{
        “create_interfund_sets”: false
}
</code></pre>

## March

### 2018-03-02

#### New
Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_client_names_list }}">
				<td>Client names (List)</td>
				<td>GET</td>
				<td>/configuration/client_names</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_grant_status_list }}">
				<td>Grant status (List)</td>
				<td>GET</td>
				<td>/grants/statuses</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_grant_type_list }}">
				<td>Grant type (List)</td>
				<td>GET</td>
				<td>/grants/types</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_grant_custom_field_list }}">
				<td>Grant custom field (List)</td>
				<td>GET</td>
				<td>/grants/customfields</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed
For the  [Period summary process (Start)]({{ stache.config.portal_endpoints_period_summary_process_start }}) endpoint, a `fiscal_period_id` was previously required. Now, when no object is sent or when a `fiscal_period_id` with value 0 is sent, all open and unoptimized fiscal periods are summarized.

## January

### 2018-01-17

#### Changed

For the  [Journal entry batch (Post)]({{ stache.config.portal_endpoints_journal_entry_batch_post }}) endpoint, `transaction_code_value` can now include `“”` empty string for `value`.

## 2017

### 2017-11-20

#### New
Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_period_summary_list }}">
				<td>Period summary (List)</td>
				<td>GET</td>
				<td>/periodsummary/summaries</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_period_summary_process }}">
				<td>Period summary process</td>
				<td>GET</td>
				<td>/periodsummary/processinginfo</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_period_summary_process_start }}">
				<td>Period summary process (Start)</td>
				<td>POST</td>
				<td>/periodsummary/summarize</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-08-14

#### New
Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_attachment }}">
				<td>Journal entry batch attachment</td>
				<td>POST</td>
				<td>/journalentrybatches/attachments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gl_media_type_list }}">
				<td>Media type (List)</td>
				<td>GET</td>
				<td>/mediaTypes</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

- For the following endpoint, we added the division, department, location, and type filters. Additional data is also returned:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_get }}">
				<td>Project</td>
				<td>GET</td>
				<td>/projects</td>
			</tr>
		</tbody>
	</table>
</div>

- For the following endpoint, we added the encumbrance and post date filters. Additional data is also returned:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution (List)</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-06-15

#### Changed

We made several changes to the [Get Account (Search)]({{ stache.config.portal_endpoints_account_search }}), [Get Project (Search)]({{ stache.config.portal_endpoints_project_search }}), [Get Journal entry batch (List)]({{ stache.config.portal_endpoints_journal_entry_batch_list }}), and [Get Transaction distribution (List)]({{ stache.config.portal_endpoints_transaction_distribution_search }}) endpoints.

- The following properties are now returned: `date_added`, `date_modified`, `added_by`, and `modified_by`.

- The `last_modified` filter is now included. This filter causes the response to only include results where `date_modified` is greater than or equal to the `last_modified` filter value.

### 2017-05-05

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_grant_list }}">
				<td>Budget grant (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/grants</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_project_list }}">
				<td>Budget project (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/projects</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

We increased the maximum record limit from 500 to 5000 on the following Get endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-01-18

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_get }}">
				<td>Account</td>
				<td>GET</td>
				<td>/accounts/{account_id}</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_get }}">
				<td>Project</td>
				<td>GET</td>
				<td>/projects/{project_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_cashflows_get }}">
				<td>Account cashflows (List)</td>
				<td>GET</td>
				<td>/accounts/cashflows</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_working_capitals_list }}">
				<td>Account working capitals (List)</td>
				<td>GET</td>
				<td>/accounts/workingcapitals</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_custom_fields_list }}">
				<td>Account custom fields (List)</td>
				<td>GET</td>
				<td>/accounts/customfields</td>
			</tr>
		</tbody>
	</table>
</div>

## 2016

### 2016-12-06

#### New

- Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_custom_field_list }}">
				<td>Journal entry custom field (List)</td>
				<td>GET</td>
				<td>/journalentries/customfields</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_custom_field_list }}">
				<td>Project custom field (List)</td>
				<td>GET</td>
				<td>/projects/customfields</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_get }}">
				<td>Budget</td>
				<td>GET</td>
				<td>/budgets</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_list }}">
				<td>Budget (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_account_list }}">
				<td>Budget account (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/accounts</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_ledger_summary_list }}">
				<td>Ledger summary (List)</td>
				<td>GET</td>
				<td>/summary/{fiscal_year_id}</td>
			</tr>
		</tbody>
	</table>
</div>

- Added new custom field entities to the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_post }}">
				<td>Project</td>
				<td>POST</td>
				<td>/projects</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_post }}">
				<td>Journal entry</td>
				<td>POST</td>
				<td>/journalentrybatches/{batch_id}/journalentries</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_get }}">
				<td>Journal entry batch</td>
				<td>GET</td>
				<td>/journalentrybatches/{batch_id}</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

For consistency across APIs, all responses to GET endpoints that return collections now return an object with "count" and "value" properties. The following endpoints are affected:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_code_list }}">
				<td>Journal code (List)</td>
				<td>GET</td>
				<td>/journalcodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_list }}">
				<td>Transaction code (List)</td>
				<td>GET</td>
				<td>/transactioncodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_value_list }}">
				<td>Transaction code value (List)</td>
				<td>GET</td>
				<td>/transactioncodes/{transaction_code_id}/values</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-11-14

#### Announcement:  Breaking Change Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

For consistency across APIs, we will implement the following changes:

- All responses to GET endpoints that return collections will return an object with "count" and "value" properties.
- The following endpoints are affected:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_code_list }}">
				<td>Journal code (List)</td>
				<td>GET</td>
				<td>/journalcodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_list }}">
				<td>Transaction code (List)</td>
				<td>GET</td>
				<td>/transactioncodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_value_list }}">
				<td>Transaction code value (List)</td>
				<td>GET</td>
				<td>/transactioncodes/{transaction_code_id}/values</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-11-01

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_post }}">
				<td>Create project (Post)</td>
				<td>POST</td>
				<td>/projects</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_contact_create }}">
				<td>Create project contact (Post)</td>
				<td>POST</td>
				<td>/projects/{project_id}/contacts</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-10-06

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fiscal_year_list }}">
				<td>Fiscal year (List)</td>
				<td>GET</td>
				<td>/fiscalyears</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_structure }}">
				<td>Account structure</td>
				<td>GET</td>
				<td>/accounts/structure</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_segment_value_list }}">
				<td>Account segment value (List)</td>
				<td>GET</td>
				<td>/accounts/segments</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_code_list }}">
				<td>Account code (List)</td>
				<td>GET</td>
				<td>/accounts/codes</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_fund_list }}">
				<td>Account fund (List)</td>
				<td>GET</td>
				<td>/accounts/funds</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
            </tr>     
		</tbody>
	</table>
</div>

#### Changed

You can now specify Class on journal entries (this affects all endpoints associated with journal entry batches).


### 2016-08-12

#### Breaking Change

We changed the default and maximum record limits on the following search and list endpoints. The default is now 100 records, and the maximum is 500 records.

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution (Search)</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_search }}">
				<td>Account (Search)</td>
				<td>GET</td>
				<td>/accounts</td>
			</tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_search }}">
				<td>Project (Search)</td>
				<td>GET</td>
				<td>/projects</td>
			</tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_list }}">
				<td>Journal entry batch (List)</td>
				<td>GET</td>
				<td>/journalentrybatches</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-07-05

#### Changed

We implemented a previously announced, breaking change. We removed the Journal entry batch (Edit) `PUT` endpoint. At a later date, we plan to replace `PUT` with `PATCH`, instead.


### 2016-06-30

#### Announcement:  Breaking Change Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

In the coming days, a breaking change will be placed into effect. We will remove the Journal entry batch (Edit) `PUT` endpoint. At a later date, we plan to replace `PUT` with `PATCH`, instead.

### 2016-06-22

#### New

Added the following endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution (Search)</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-06-15

#### Changed

We've added a versioning indicator to the General Ledger API's base URL. Specifically, all new API requests must begin with `https://{{ stache.config.resource_hostname }}/generalledger/v1`.

### 2016-06-10

#### Announcement: Breaking Changes Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

- We will be adding a versioning indicator to the General Ledger API's base URL. Specifically, all new API requests should begin with `https://{{ stache.config.resource_hostname }}{{ stache.config.gl_api_suffix }}/v1`.
- This change is planned to take effect on Wednesday, June 15.


### 2016-05-27

#### New

- Added a [General Ledger getting started guide]({{ stache.config.guide_getting_started }}) to help you make your first General Ledger API call with our interactive {{ stache.config.dev_console_name }}.
