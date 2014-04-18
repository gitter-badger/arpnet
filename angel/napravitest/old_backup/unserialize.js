
function unserialize(data){var that=this,utf8Overhead=function(chr){var code=chr.charCodeAt(0);if(code<0x0080){return 0;}
if(code<0x0800){return 1;}
return 2;},error=function(type,msg,filename,line){throw new that.window[type](msg,filename,line);},read_until=function(data,offset,stopchr){var i=2,buf=[],chr=data.slice(offset,offset+1);while(chr!=stopchr){if((i+offset)>data.length){error('Error','Invalid');}
buf.push(chr);chr=data.slice(offset+(i-1),offset+i);i+=1;}
return[buf.length,buf.join('')];},read_chrs=function(data,offset,length){var i,chr,buf;buf=[];for(i=0;i<length;i++){chr=data.slice(offset+(i-1),offset+i);buf.push(chr);length-=utf8Overhead(chr);}
return[buf.length,buf.join('')];},_unserialize=function(data,offset){var dtype,dataoffset,keyandchrs,keys,readdata,readData,ccount,stringlength,i,key,kprops,kchrs,vprops,vchrs,value,chrs=0,typeconvert=function(x){return x;};if(!offset){offset=0;}
dtype=(data.slice(offset,offset+1)).toLowerCase();dataoffset=offset+2;switch(dtype){case'i':typeconvert=function(x){return parseInt(x,10);};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'b':typeconvert=function(x){return parseInt(x,10)!==0;};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'd':typeconvert=function(x){return parseFloat(x);};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'n':readdata=null;break;case's':ccount=read_until(data,dataoffset,':');chrs=ccount[0];stringlength=ccount[1];dataoffset+=chrs+2;readData=read_chrs(data,dataoffset+1,parseInt(stringlength,10));chrs=readData[0];readdata=readData[1];dataoffset+=chrs+2;if(chrs!=parseInt(stringlength,10)&&chrs!=readdata.length){error('SyntaxError','String length mismatch');}
break;case'a':readdata={};keyandchrs=read_until(data,dataoffset,':');chrs=keyandchrs[0];keys=keyandchrs[1];dataoffset+=chrs+2;for(i=0;i<parseInt(keys,10);i++){kprops=_unserialize(data,dataoffset);kchrs=kprops[1];key=kprops[2];dataoffset+=kchrs;vprops=_unserialize(data,dataoffset);vchrs=vprops[1];value=vprops[2];dataoffset+=vchrs;readdata[key]=value;}
dataoffset+=1;break;default:error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);break;}
return[dtype,dataoffset-offset,typeconvert(readdata)];};return _unserialize((data+''),0)[2];}
var arr=['4c8f90941072a','4d7e699a05145','4d360df69ac7a','4cf169279edca','4d36aa9640d5a','4cbecd00ae30d','4d43246684efe','4d499c9805409','4cecfe648f4de','4c8540bae0ae9','4d430f12c1eb4','4d430cdd5f375','4c8bcbf14c8fe','4c7c1241cc3ed','4c8bdc16968e0','4c7d3e53a5034','4c894431ca1a9','4c8692b035e16','4c89fbe98a946','4c8a06f93f429','4c8a9536abde3','4c6e6443d4c51','4c892965e1f2b','4c868afcd68f4','4c7a78503fb39','4d4c4c71d24f7','4d4c529602d21','4d91f971768ed','4ca095a4458dd','4d7916ca7b57f','4c76b8fc92f06','4d4c47bbdd850','4d4c4ff3283c8','4d45bc19c09b8','4d43163958039','4d48606323082','4c7a80b55c403','4d7bc2e2619cb','4c78121b36041','4d49b085462ce','4d52eeb829d5d','4d446a659ba1f','4c87559b7c1fa','4c6bba2a9caed','4d485c0ea5fec','4d7bcc165cdb6','4d486bea85eb0','4c739b1b6774a','4c6e3b084fd51','4d10f94f36b59','4d3495174b9b0','4db311a41732e','4d4c3b590cd4d','4d4afca7c1068','4c6c4e225def9','4d7d15779e9a0','4e204894ac936','4c6cf891a680f','4c6c09d7b596b','4c852df741412','4d237a1740048','4c8805dcd0ad3','4c6fd130f3da0','4d4d9b9e92ade','4cfaa0281b2c8','4d44658bd30cb','4d3f2999a12c9','4cbdd0877e647','4d5038a0ccada','4c763d97328f9','4c6af7a8734db','4c6bad9c9ee3f','4c7cd3993f534','4d19d5c226b6c','4d23864d60ca7','4d349db52762c','4c792e805a556','4cc96c098539f','4c7ccc7726d0f','4d52d9eabdf88','4c7d4d6b76e72','4d7fc1b980d5d','4d74b56a87f25','4d4309bf01e9d','4c79235f806b6','4c76afb24cef5','4c711038103b9','4d5049b048263','4d4ef9161bdbb','4d45b9061f808','4cb0aa52b204b','4d3de03685366','4d3b30dbd1621','4d49ab2f45ddd','4c7237538055d','4d5045741756a','4c78dbc9525b3','4c77fdc3c9943','4c85078876e65','4e33b4aac8855','4d4320c3082a5','4c8d2cf477f4e','4c7431712dd71','4d238fad32585','4d43282a2e7b0','4c84f2b76d187','4c874a5d6ba26','4d470f9d5d972','4d2cb6f07aad3','4c99fa79715d6','4d8de21a8ca7d','4ca5b1ba62c76','4c78ed49d9f59','4cc9cf97ac5df','4d39ee71a92cc','4c908b04abf40','4d374ea37dff5','4d47059be3327','4e67b47f1764a','4c74dabb43542','4d49be05c0ec4','4c8d41cb2bc01','4d8dd035cf122','4d470a8029f9b','4d3f287471b19','4ccdd1ae5d009','4d237cdaa1cc4','4d7e74303c694','4c7a1d7a66cf1','4d4da162a1d97','4d46f95b2f4e3','4c6bf423686b0','4d445c0b828d8','4c7a6bc36a73f','4d431827530dc','4d7fadf9de7c6','4d8dd7ab8f9ba','4dcfe6b132202','4d139763ab188','4d2f597d0a3bb','4d3883a646c4b','4e590640b6b60','4d37514bbe77a','4c6e2fe2784f5','4c6ce4e2558e5','4c768661ba160','4c9c0060bcfc6','4c7cb9fbd63c0','4d4c4011f22f8','4d431a2577b32','4cd974f912d8a','4d4311ded726b','4d374b9d6840c','4c8fbcb42c6fa','4d3f1985c9fab','4cb751439be73','4d4af8034403f','4cb48fb75e317','4d7fb063622d4','4d3de3d2aa819','4d4dade96529d','4d48637ead2d0','4c7c24076a4d7','4c8e474561438','4d2377f96201f','4d39e95e921ee','4ce6cb961b19d','4cd9b93a52b96','4d2220fbf0223','4c73890513d9f','4d0ce705baeea','4d3ddcbb80c81','4d2f997d6c21b','4d49b4c9df097','4c8bcea65a899','4dfe1259297db','4d3c7f3082aaf','4d2cc17c6c92d','4d35f1fbf1a7c','4d28cf32958ae','4d7a6c91aa1c6','4d221aed64dcb','4d45be3d89438','4c8d1f3c3d335','4cc161cfe37fd','4c77d8096f632','4cbdc53a3eee2','4c907da2d4fac','4c7704cb1ce9f','4d39e7e66876d','4caf59a79e9be','4d38916ba2fd3','4c90738c270da','4d46ffca7b971','4cdc02e62a90a','4d436ea142973','4d3dcf4c0f543','4c6ae78adbaa2','4c9f371e2f025','4c8e52b0927b6','4d373ac56452a','4d40720533156','4d35e72782abf','4d35e9c690d84','4d3c4a7f66e3b','4c6a7dcd6be95','4d7d1b951f70f','4d46b74a2c98c','4cdc5aa761483','4cc734ec86e5c','4d3dd7fd97558','4d34a8b3beac9','4d3744cf0fbba','4d35dd1d90127','4d357cebd88f2','4d2d9195e8643','4d791da26264d','4c70f02f08117','4d3c8e28336fc','4d39ec65ca35e','4d3c7a660b7db','4c9c031e9d005','4c6c1c810de2f','4d2898526fbbb','4d3f2304a3274','4d44659f42546','4cc881e93efde','4d6bfa433c8de','4d3887906d322','4e119aa0cc256','4dec90ec05ed5','4d93597dc89c6','4ca325f9461cf','4c990605d7c36','4d0bd5cfc611d','4d84ef82999e0','4d2892131041b','4ce6d244cefdd','4d54324b478c8','4ce6cdfa1f6eb','4d469fbc3f580','4cab1acd4b700','4d261d1df3f94','4d43079ca0833','4d43134e38de5','4e49129206b1e','4e579c7382510','4d2614e447801','4d1df36bdaf50','4d485e5e43823','4cc4292780148','4d408603cc547','4cc42204def26','4c99bd0586022','4cc82c6eabf75','4e67af0b6299b','4d0cd7baa1f7f','4c73b45fcaaa3','4d5fee95017ea','4ccefbab475a0','4d4444ca0dca0','4d0d4511e5fb8','4d41668c8a8ca','4cb0e83c99892','4d54637705f0a','4d084a4a37549','4d615955874e4','4d341b6d6f51e','4d08bdffab7c4','4d2b54e2493c4','4d24bb13d5b47','4d19d5e219e33','4d54464733058','4d1347612389e','4ca9bb337c7ad','4cd6e5200030e','4cc852e18dfe4','4d4529b938845','4d270433c2500','4d5fead01e413','4d4316e6b5057','4c88b3c77c1c3','4c99bb43dc1b2','4d4c362a99a8f','4c8526a7381d6','4ca61dbddb97a','4ddf7e5b75722','4d3b2868d593b','4d98a1a259b04','4d446258ceb36','4cb9f9bc77ebc','4e28195256674','4d3acb87ef9d1','4d42dec839447','4d43345621475','4d2e26f65b266','4d2f380e36fb7','4d0e4f772902a','4c9ce63df07ff','4cfcf47ac1801','4c9fb710f06ce','4d0a40e54e099','4d3dce47b5bdf','4d4d3f2431f46','4d0e1e5f326da','4d03bc72e400d','4cf65e82c8f5e','4d39ed1149781','4d5ea308f3ffe','4d875951a8021','4d5562711a8fd','4d46bcc2d1880','4d6ec2743c18c','4d875b389e4de','4d677e7cf0219','4d0f8caba85d0','4d875317da47e','4cb0b92a09069','4d4d65152322a','4d34a0407ad40','4c9a0b07e96de','4cbb44165b1ec','4cf7e8016c1cd','4d2193de781b1','4d4b0e656672a','4d85fc505341a','4cc59b0e31365','4cc599544be2f','4d39f0b0873a6','4e317638c3ef4','4d0b2d2913fbb','4d9abf1602dfc','4cfbac4901786','4d456ae599711','4cab06d807499','4d57cf25ab62e','4da069f15f0ed','4cae5a0cc4cca','4cb4c790ab859','4d04cbd4a1339','4e31774ae7495','4d0ba283b0437','4d4565f799742','4cb95512433d6','4d5f5ed575654','4d21999558fac','4d2606cf45d7a','4d468dcb18409','4cb4963617b16','4d443b22b92bf','4d47ba256dbc2','4ca384d0b818c','4d35a2b3b8d6e','4d4eda923092a','4da1ca4baf803','4d4ed4bfefd2e','4d5792dc7e7d2','4d4e6278c61ca','4cfed3013f27e','4d2f147b3f601','4d5530e37e931','4cfa924036648','4d40504e548bc','4d66a9f112b6a','4d4d5a24a2245','4c8cd9ee8f396','4ce6f5c013c4f','4d4ed1e855895','4d07e345ddf4a','4c9d8ca17270a','4cb0b469b623a','4d1ca1c01dac9','4c86823660978','4d56de67050bf','4cc5525b87910','4d0dd330c628e','4d6629c4b010b','4cc83772805f1','4d5f5d41d25cc','4d3c7f2998558','4cbf711861edb','4dcb9698c1b4b','4d1dd36d9590b','4c878a00a1ed7','4cb5d6e3ed145','4d4d823973e2b','4cb5a3376fe6b','4d16232ab2af7','4cced59816f8c','4d872ffb6d65f','4cbdba997b2b2','4d18fde36bc28','4d39b5a2ee854','4cc597b92c0b2','4d85fa5d6c758','4d56b16522d0a','4c998b4aafab6','4d56bd129c992','4d48428738573','4dcfe81c4dbb7','4cc17f86ef965','4d19b9de03a4d','4cc17e7db4c6f','4d3c3e05143c2','4cd2c85b45e69','4ced416d217ec','4cbc98800faeb','4d459f6fe68cb','4d29fac03c10d','4d6ffe3d39e94','4d56b06994cf5','4d46f58029905','4d4436b8be6d4','4d0b9e5da1019','4cd2f23d216f9','4cf929385b9de','4ced4380bf6b9','4d4d581ce624a','4d57aa134745a','4d56b9fbeec5b','4cdd748fb9679','4d4826ce73954','4d56b81684370','4d45adc056a9f','4ccde43098e4b','4d8dd6791aee7','4d2c743095f96','4d4d68831bb9e','4d56ad9629b3d','4dcc1be6cd16a','4d04b855c1f4e','4d94558e7ef46','4d19aa36eb01f','4d3c70de1b74e','4d060e9854dc6','4d4dad56091e5','4c92922f4a711','4d4e926aa5782','4cde5ca97d18d','4cc59a31b44c8','4db31fcaa445a','4cc6f55b48de5','4d46f74d566e1','4cf7e5f91b5f2','4cd9a8b8c5db5','4d558a758de83','4cdc4b94ed509','4d4d418b63209','4d3355971a3c2','4db980aaabd8d','4d8f403b9a1bb','4d56af42653d0','4d46f6b9cd3e6','4cbaaa7bdc538','4cec192fd243d','4cfd3c34e1244','4cc70d8b52226','4dcb9480111d1','4d45b36e9e459','4d45b488e62c2','4cb6f598ce1d4','4d4056f2ccc01','4d56b6c18bbc6','4d4050ace6b2b','4cacac02ee870','4d2f18afcdffd','4d4c09303cc15','4cf6881336526','4d482a45509f5','4d85fbf21e033','4d1b9081565cd','4d48347b83d25','4d4828d080097','4d335c2383f7b','4d335987532d4','4d3eefb3a8f57','4cf24e20b2d3f','4d71237113342','4d4829a2ca640','4d920f81b00b4','4d27273e3395b','4cd021afd2395','4d08a918b4a45','4cd2daecd782a','4ce6d2636ff96','4e157a31572ff','4d400ee5cbb0e','4cfe1b0f61c36','4d49791f1b7a4','4d3dd960665d8','4d6168c2c2ca7','4d42066dcccc1','4d57d842d2ba6','4d4436ff8238d','4d4f473364dd2','4d3738fe4e3c7','4d482bf56b757','4d392b333698e','4cead6667d939','4d407a209c814','4d55b6ea3677c','4d3a137b94a04','4d431797bc0a8','4d44fddfe4380','4ce6d2d181098','4d4915c0177c4','4d4db06def0fb','4e280fbc0fb20','4d481eae5131a','4d56de3f4b8bc','4d529b7bab9fd']
var fs=require('fs');


arr.forEach(function(val,index){
	console.log(val);

var file = val;
fs.readFile(__dirname+'/data/'+file+'.txt', 'utf8', function(err, data) { 
 if(data[0] != "{") {
  var json = unserialize(data);
    if(!err) { 
 

 console.log(json._id);
 if(json._id) {
	 fs.writeFile(__dirname+'/data/'+file+'.txt', JSON.stringify(json), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    })
 }

}

 }
 
})

})