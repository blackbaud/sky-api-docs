---
layout: layout-sidebar
name: School (Beta)
description: Information on additions and changes for the School API (Beta).
order: 210
published: true
showInNav: false
icon: fa fa-graduation-cap
back_to_top: true
title: School (Beta) Changelog
---

# {{ name }}

Monitor this page to keep up with the [School API (Beta)]({{ stache.config.portal_endpoints_school }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 30 May 2018

### New

Added the following endpoint(s):

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
        <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_student_single_section_list}}">
          <td>Student list (single section)</td>
          <td>GET</td>
          <td>/academics/sections/{section_id}/students</td>
        </tr>
         <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_user_extended_list}}">
          <td>User extended list</td>
          <td>GET</td>
          <td>/users/extended?base_role_ids={base_role_ids}[&marker]</td>
        </tr>
         
        
      </tbody>
    </table>
</div>

## 15 May 2018

### New

Added the following endpoint(s):

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
        <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_student_enrollement_list}}">
          <td>Student enrollment list</td>
          <td>GET</td>
          <td>/academics/enrollments/{student_id}[?school_year]</td>
        </tr>
         <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_phone_type_list}}">
          <td>Phone type list</td>
          <td>GET</td>
          <td>/users/phonetypes</td>
        </tr>
         <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_assignment_list_single}}">
          <td>Assignment list (single section) </td>
          <td>GET</td>
          <td>/academics/sections/{section_id}/assignments[?types][&status][&persona_id][&filter][&search]</td>
        </tr>
        <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_section_list}}">
          <td>Section list</td>
          <td>GET</td>
          <td>/academics/sections[?level_num][&school_year]</td>
        </tr>
        <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_relationship_list}}">
          <td>Relationship list (single user)</td>
          <td>GET</td>
          <td>/users/{user_id}/relationships</td>
        </tr>
        
      </tbody>
    </table>
</div>