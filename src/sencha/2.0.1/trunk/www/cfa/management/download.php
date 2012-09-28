<style>
	.container{
		border: 1px dashed #999;
		height: 250px;
		width: 400px;
		margin: 0 auto;
		border-radius: 8px;
		padding-top: 15px;
	}
	.info-panel{
		margin: 0 auto;
		width: 320px;
	}
	
	.title{
		font-family: Verdana, Geneva, sans-serif;
		font-size:24px;
		font-weight: bold;
		text-align:center;
	}
</style>

<p class="title">Application Distribution</p></h1>
<div class="container" >
<form class="info-panel" method="post" action="activate.php" >
<table width="320" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="88">First name</td>
    <td width="216"> <input type="text" name="firstname" required/>  </td>
  </tr>
  <tr>
    <td>Last name</td>
    <td><input type="text" name="lastname" required/></td>
  </tr>
  <tr>
    <td>Agency</td>
    <td><input type="text" name="agency"required/></td>
  </tr>
  <tr>
    <td>Phone</td>
    <td><input type="text" name="phone"/></td>
  </tr>
  <tr>
    <td>Email</td>
    <td><input type="text" name="email" required/></td>
  </tr>
  </tr>
</table>
<div style="width: 57px; margin: 10px auto"><input type="submit" value="Submit" /></div>
</form>
</div>
