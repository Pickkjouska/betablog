<template>
  <div class="mx-w mb-4 flex fixed">
    <div class="flex-none w-14 h-14">
    <LeftLable/>
    </div>
    <div class="flex-none w-14 h-14">
    <ColorButton/>
    </div>
    <div class="grow h-14"></div>
    <div class="flex-none h-12 ">
      <Returntop/>
    </div>
    <div class="flex-none w-30 h-12 ">
      <Search/> 
    </div>
    
  </div>
</template> 

<style scoped>
.fixed{
  position: sticky;
  top: 0px;
}
</style>