<script>
  import XLSX from "xlsx";
  //import * as writejson from "writejson"
  //import fs from "fs"
  //import clipboard from "clipboard-polyfill" // this is the old way of calling this library
  import * as clipboard from "clipboard-polyfill";
  import { fade, slide, fly, scale, blur } from "svelte/transition";
  import "./google.js";
  import { excel_data, is_table_proess_with_fk } from "../stores.js";
  import {
    data_type,
    not_null,
    parimary_value,
    reference_modes
  } from "../Shares/All.svelte";
  import Dropzone from "svelte-dropzone";
  import { onMount, onDestroy } from "svelte";
  let fd = {}; // fd = fileDetail
  let is_processed = false;
  let is_process_with_fk = false;
  const addedfile = file => console.log(file);
  const drop = event => console.log(event.target);
  const init = () => console.log("Drop Zone Init!");

  let files = [];
  let data = [];
  let temp1 = [];
  let temp2 = [];
  let excelData = [];
  let x_c = [];
  let tables = [];
  onMount(async () => {
    /* const res = await fetch("http://localhost:3000/code/api/getTableName");
    tables = await res.json(); */
    //console.log(data_type);
  });
  $: {
    console.log(is_process_with_fk);
  }
  function checkXC() {
    console.log(x_c);
  }
  const unsubscribe = excel_data.subscribe(data => (x_c = data));
  const unsubscribe2 = is_table_proess_with_fk.subscribe(
    d => (is_process_with_fk = d)
  );
  function handleFile() {
    is_table_proess_with_fk.update(data => (data = "yes"));
  }
  function handleFileNoFK() {
    is_table_proess_with_fk.update(data => (data = "no"));
  }

  function checkDataType(obj) {
    // check if datatype in excel file is correct
    // sum the correct
    // sum the incorrect
  }
  function gTableName(obj) {
    // CREATE TABLE TABLE_NAME (

    return ` CREATE TABLE ${obj.data.table_name}`;
  }

  function getNull(value) {
    if (value == "Y") {
      return " NOT NULL";
    } else {
      return " NULL";
    }
  }
  function getPrimaryKey(value) {
    if (value == "Y") {
      return " PRIMARY KEY";
    } else {
      return "";
    }
  }
  function getDescription(value) {
    if (value != "") {
      return ` COMMENT '${value}'`;
    } else {
      return "";
    }
  }

  function getAutoIncrement(value) {
    if (value == "Y") {
      return ` AUTO_INCREMENT`;
    } else {
      return "";
    }
  }

  function getDefaultValue(value) {
    if (value != "") {
      return ` DEFAULT '${value}'`;
    } else {
      return "";
    }
  }

  function gField(obj) {
    var fields = [];
    for (var i = 0; i < obj.data.table_column.length; i++) {
      if (i == 0) {
        fields.push(
          "" +
            obj.data.table_column[i].COLUMN_NAME +
            " " +
            obj.data.table_column[i].DATA_TYPE +
            "(" +
            obj.data.table_column[i].SIZE +
            ")" +
            getNull(obj.data.table_column[i].NOT_NULL) +
            getDescription(obj.data.table_column[i].DESCRIPTION) +
            getAutoIncrement(obj.data.table_column[i].AUTO_INCREMENT) +
            getPrimaryKey(obj.data.table_column[i].PRIMARY_KEY) +
            getDefaultValue(obj.data.table_column[i].DEFAULT)
        );
      } else {
        fields.push(
          "\n     " +
            obj.data.table_column[i].COLUMN_NAME +
            " " +
            obj.data.table_column[i].DATA_TYPE +
            "(" +
            obj.data.table_column[i].SIZE +
            ")" +
            getNull(obj.data.table_column[i].NOT_NULL) +
            getDescription(obj.data.table_column[i].DESCRIPTION) +
            getAutoIncrement(obj.data.table_column[i].AUTO_INCREMENT) +
            getPrimaryKey(obj.data.table_column[i].PRIMARY_KEY) +
            getDefaultValue(obj.data.table_column[i].DEFAULT)
        );
      }

      var code = `CREATE TABLE ${obj.data.table_name}
(
     ${fields}
)
`;
    }
    return fields;
  }
  function getReferenceTable(value) {
    return value.split(".")[0];
  }

  function getReferenceField(value) {
    return value.split(".")[1];
  }

  function getRefDelete(value) {
    if (value != "") {
      return `ON DELETE ${value}`;
    } else {
      return "";
    }
  }
  function getRefUpdate(value) {
    if (value != "") {
      return `ON UPDATE ${value}`;
    } else {
      return "";
    }
  }

  function gReference(obj) {
    //fk_table_name_column_name
    //  CONSTRAINT `fk_item_type_id` FOREIGN KEY (`TYPE_ID`) REFERENCES `ftp_alm_uat`.`tbl_unit_type` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE

    var references = [];
    for (var i = 0; i < obj.data.table_column.length; i++) {
      if (i == 0) {
        if (obj.data.table_column[i].REFERENCE != "") {
          references.push(
            `     CONSTRAINT fk_${obj.data.table_name}_${
              obj.data.table_column[i].COLUMN_NAME
            } FOREIGN KEY ('${
              obj.data.table_column[i].COLUMN_NAME
            }') REFERENCES ${getReferenceTable(
              obj.data.table_column[i].REFERENCE
            )} ${getReferenceField(
              obj.data.table_column[i].REFERENCE
            )} ${getRefUpdate(
              obj.data.table_column[i].REFERENCE_MODE
            )} ${getRefDelete(obj.data.table_column[i].REFERENCE_MODE)}`
          );
        }
      } else {
        if (obj.data.table_column[i].REFERENCE != "") {
          references.push(
            `\n     CONSTRAINT fk_${obj.data.table_name}_${
              obj.data.table_column[i].COLUMN_NAME
            } FOREIGN KEY ('${
              obj.data.table_column[i].COLUMN_NAME
            }') REFERENCES ${getReferenceTable(
              obj.data.table_column[i].REFERENCE
            )} ${getReferenceField(
              obj.data.table_column[i].REFERENCE
            )} ${getRefUpdate(
              obj.data.table_column[i].REFERENCE_MODE
            )} ${getRefDelete(obj.data.table_column[i].REFERENCE_MODE)}`
          );
        }
      }
    }
    return references;
  }
  function gComment(obj) {
    return `COMMENT = '${obj.table_description}'`;
  }

  function gTableSQL() {}

  function gSQL(obj) {
    var fields = gField(obj);
    var references = [];
    var comma = "";
    var comment = gComment(obj);

    var empty_reference = 0;
    var have_reference = 0;
    if (is_process_with_fk == "yes") {
      /*       for (var i = 0; i < obj.data.table_column.length; i++) {
        console.log(obj.data.table_column[i].REFERENCE);
        if (obj.data.table_column[i].REFERENCE == "") {
          empty_reference = empty_reference + 1;
        } else if (obj.data.table_column[i].RERFENCE != "") {
          have_reference = have_reference + 1;
        }
      } */

      /*  obj.data.table_column.forEach(function(el) {
        Object.keys(el).forEach(function(property) {
          if (el[property] === "") {
           console.log('this is column is null')
          }
        });
      });
 */
      /*     console.log("no reference: " + empty_reference);
      console.log("have references: " + empty_reference); */

      comma = ",";
      references = gReference(obj);
    } else if (is_process_with_fk == "no") {
      references = "";
      comma = "";
    }

    var code = `CREATE TABLE ${obj.data.table_name}
(
     ${fields}${comma}
     ${references}
) ${comment};
`;

    return code;
  }

  function copy(sql_command) {
    clipboard.writeText(sql_command);
  }
  function checkFile() {
    console.log(files);
  }
</script>

<style>
  .table_name {
    font-size: 18px !important;
    color: white !important;
  }
  .flex-container {
    display: -webkit-flex; /* Safari */
    -webkit-flex-wrap: wrap; /* Safari 6.1+ */
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap !important;
  }

  .contain-wrap {
    display: -webkit-flex !important; /* Safari */
    -webkit-flex-wrap: wrap !important; /* Safari 6.1+ */
    display: flex !important;
    flex-wrap: wrap !important;
  }
  .flex-start {
    justify-content: flex-start;
  }

  .flex-end {
    justify-content: flex-end;
  }
  .flex-end li {
    background: gold;
  }

  .center {
    justify-content: center;
  }
  .center li {
    background: deepskyblue;
  }

  .space-between {
    justify-content: space-between;
  }
  .space-between li {
    background: lightgreen;
  }

  .space-around {
    justify-content: space-around;
  }
  .space-around li {
    background: hotpink;
  }

  .space-evenly {
    justify-content: space-evenly;
  }
  .space-evenly li {
    background: #bada55;
  }

  .flex-item {
    background: tomato;
    padding: 5px;
    width: fit-content;
    height: 20;
    margin: 5px;
    line-height: 50px;
    color: white;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
  }

  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .cf {
    font-family: "Fredoka One", cursive;
  }
</style>

{#if x_c.length == 0}
  <div class="box has-text-centered">
    <button class="button is-success is-outlined">Please upload data.</button>
  </div>
  <!-- content here -->
{/if}

{#if x_c.length != 0}
  <div class="box has-text-centered">

    <button on:click={handleFile} class="button is-info shadow is-outlined cf">
      Generate sql scripts with foreign key paring
    </button>
    <button
      on:click={handleFileNoFK}
      class="button is-info shadow is-outlined cf">
      without foreign key paring
    </button>

  </div>
{/if}
{#if is_process_with_fk == 'yes'}
  <div in:scale out:scale class="box flex-container center sticky">
    {#each x_c as it, i}
    <div>
      <a class="flex-item button is-success is-outlined" href="#{it.data.table_name}">
        {i + 1} {it.data.table_name}
      </a>
    </div>
    {/each}
  </div>

  {#each x_c as item, i}
    <div in:scale out:scale class="box">
      <div class="level">
        <div class="level-left">
          <p id={item.data.table_name}>
            <span class="table_name">{i + 1}. {item.data.table_name}</span>
          </p>
        </div>
        <div class="level-right">
          <button
            class="button is-primary is-outlined is-small"
            on:click={copy(gSQL(item))}>
            Copy
          </button>
        </div>
      </div>
      <br />
      <pre class="">
        <code class="">{gSQL(item)}</code>
      </pre>
    </div>
  {/each}
  <!-- content here -->
{:else if is_process_with_fk == 'no'}
  <div in:scale out:scale class="box flex-container center sticky">
    {#each x_c as it, i}
      <div class="">
        <a
          class="flex-item button is-success is-outlined"
          href="#{it.data.table_name}">
          {i + 1} {it.data.table_name}
        </a>
      </div>
    {/each}
  </div>

  {#each x_c as item, i}
    <div in:scale out:scale class="box">
      <div class="level">
        <div class="level-left">
          <p id={item.data.table_name}>
            <span class="table_name">{i + 1}. {item.data.table_name}</span>
          </p>
        </div>
        <div class="level-right">
          <button
            class="button is-primary is-outlined"
            on:click={copy(gSQL(item))}>
            Copy
          </button>
        </div>
      </div>
      <br />
      <pre class="">
        <code class="">{gSQL(item)}</code>
      </pre>
    </div>
  {/each}
{/if}
