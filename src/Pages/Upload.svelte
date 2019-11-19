<script>
  import XLSX from "xlsx";
  import { excel_data } from "../stores";
  import {fade, fly,slide} from "svelte/transition"
  let files = [];
  let data = [];
  let temp1 = [];
  let temp2 = [];
  let excelData = [];
  let is_processed = false;
  let local_excel_data = [];
  let unsubscribe = excel_data.subscribe(value => {
    local_excel_data = value;
  });

  function onChoose(e) {
    console.log(e.target.files);
    readExcel(files);
  }

  function setData() {
    excelData = [];
    manipulateExcel();

    excel_data.set([]);
    excel_data.update(data => (data = excelData));
  }
  function openFileInput() {
    var input = document.getElementById("fileinput");
    input.click();
  }
  function manipulateExcel() {
    temp1.forEach((element, index) => {
      excelData.push({
        table_description: element[0]["TABLE_DESCRIPTION"]
      });
    });

    temp2.forEach((element, index) => {
      excelData[index]["data"] = element;
    });

    console.log(excelData);
  }

  function clearFileInput() {
    console.log("On Clear Input...");
    var input = document.getElementById("fileinput");
    input.value = "";

    files = [];
    excelData = [];
    temp1 = [];
    temp2 = [];
    local_excel_data = [];
    is_processed = false;
  }
  function readExcel(file) {
    let reader = new FileReader();
    reader.onload = () => {
      let fileData = reader.result;
      const workbook = XLSX.read(fileData, { type: "binary" });
      workbook.SheetNames.forEach((element, index) => {
        temp1.push(
          XLSX.utils.sheet_to_json(workbook.Sheets[element], { defval: "" })
        );

        temp2.push({
          table_column: XLSX.utils.sheet_to_json(workbook.Sheets[element], {
            range: 2,
            defval: ""
          }),
          table_name: workbook.SheetNames[index]
        });
      });
    };
    reader.readAsBinaryString(file[0]);
  }
</script>
<svelte:head>
	<title>Upload</title>
</svelte:head>
<div in:slide out:slide class="box has-text-centered">
  <input

    on:change={onChoose}
    style="display: none;"
    id="fileinput"
    accept=".xlsx, .xls"
    type="file"
    bind:files />
  {#if local_excel_data.length == 0}
    <!-- <button on:click={checkFile} class="button is-primary">check files</button> -->
    {#if files.length == 0}
      <!-- content here -->
      <button   on:click={openFileInput} class="button is-success is-outlined cf">
        Choose excel file
      </button>
      <br />
      <br />

      <a
     
        href="table_template.xlsx"
        class="button is-success is-outlined is-small">
        download excel template
      </a>
    {/if}
  {/if}

  {#if local_excel_data.length == 0}
 
    {#if files.length != 0}
      <button   on:click={setData} class="button is-primary is-outlined is-small">
        set data
      </button>
    {/if}
  {:else}
    <button   on:click={clearFileInput} class="button is-danger is-outlined cf">
      Reset excel file
    </button>
  {/if}

</div>
