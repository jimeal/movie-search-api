//const targetDate = $("#targetDateInput").val();
// $("form").on("submit", function (event) {
//   event.preventDefault();
//   console.log( $( this ).serialize() );
// });
function movieRank() {
  const targetDate = $("#targetDateInput").val();
  const API_KEY = "f5eef3421c602c6cb7ea224104795888"
  const url = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+ API_KEY+'&targetDt='+targetDate;

  $.ajax({
    url: url,
    dataType: "json",
    success: function(data) {
      // console.log(data)

      if(data.faultInfo) {
        $(".container .popup-body table").append(`
          <tr>
            <td class="error">${data.faultInfo.message}</td>
          </tr>
        `)
        return
      }else {
        const rank = data.boxOfficeResult.dailyBoxOfficeList;

        $(".container .popup-body table").html(
          `
            <tr>
              <th>순위</th>
              <th>제목</th>
              <th>개봉일</th>
            </tr>
          `
        )

        for(let i = 0; i < rank.length; i++) {
          $(".container .popup-body table").append(
            `
              <tr>
                <td><span>${rank[i].rank}</span></td>
                <td>${rank[i].movieNm}</td>
                <td>${rank[i].openDt}</td>
              </tr>
            `
          )
        }
      }
    },
    error: function() {
      console.error('Error')
    }
  })
}

$("#targetDateInputButton").click(function() {
  $(".popup").show();
  movieRank();
})
$(".popup-header--left").click(function() {
  $(".popup").hide();
  $(window).prop("location", location.href);
})

// $("#targetDateInput").focus(function() {
//   const targetDate = $("#targetDateInput").val();
//   if(targetDate) {
//     $("#targetDateInput").attr("value", "")
//   }
// })
$("#targetDateInput").keypress(function(e) {
  if(e.keyCode == 13) {
    movieRank()
  }
})

function inputChangeValue() {
  const inputEl = document.querySelector("#targetDateInput");
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  console.log()
  inputEl.value = year + month + day - 1;
}
inputChangeValue()