import $ from "jquery";

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


function movieRank() {
  const targetDate = $("#targetDateInput").val();
  const API_KEY = MOVIE_API_KEY;
  const url = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+ API_KEY+'&targetDt='+targetDate;

  $.ajax({
    url: url,
    dataType: "json",
    success: function(data) {

      if(data.faultInfo) {
        $(".popup-body table tbody").append(`
          <tr>
            <td class="error">${data.faultInfo.message}</td>
          </tr>
        `)
        return
      }else {
        const rank = data.boxOfficeResult.dailyBoxOfficeList;

        $(".popup-body table thead").html(
          `
            <tr>
              <th>순위</th>
              <th>제목</th>
              <th>개봉일</th>
            </tr>
          `
        )

        for(let i = 0; i < rank.length; i++) {
          $(".popup-body table tbody").append(
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

function inputKeypress (e) {
  let key = e.keyCode;
  if (key == 13) {
    e.preventDefault();
    document.querySelector('input').blur(); 
    $(".popup").show();
    movieRank();
  }
}
document.querySelector("#targetDateInput").addEventListener("keyup", inputKeypress)

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


