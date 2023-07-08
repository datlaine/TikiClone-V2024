const kiemTraThu = (thu, Now) => {
  let check = false;
  if(Now) {
    if (thu + 2 === 8) {
      thu = 8;
      check = true;
    }
  
    if (thu + 2 === 9) {
      thu = 10;
      check = true;
    }
    if (thu + 2 !== 8 && thu + 2 !== 9 && !check) {
      thu += 2;
      console.log(`&&`);
    }
    return thu
  }
  else {
    if (thu - 2 === 0) {
      thu = 7;
      check = true;
    }
  
    if (thu - 2 === 1) {
      thu = 8;
      check = true;
    }
    if (thu - 2 !== 0 && thu - 2 !== 1 && !check) {
      thu -= 2;
      console.log(`&&`);
    }
  }
  return thu
}

const laySoNgayTrongThang = (nam, thang) => {
  return new Date(nam, thang, 0).getDate();
};

const fast = (isDate, isDay, monthCurrent, tietKiem, thu, ngay,Now, thangHienTai) => {

  console.log({isDate, isDay, monthCurrent, tietKiem, thu, ngay,Now, thangHienTai})
  if(!isDate && !isDay) {
    if(!tietKiem) {
    isDate = kiemTraThu(thu)
    isDay = ngay + 2
    }else {
      isDate = kiemTraThu(thu+2)
      isDay = ngay + 4
    }
  }
  if(Now) {

    console.log(thu)
    thu = kiemTraThu(thu, Now)

    console.log({thu,ngay, monthCurrent})
    return `Thứ ${thu}, ngày ${ngay+2}-${monthCurrent}`
  }
  else {
  console.log({isDate,isDay});
  let isDateNumber;

  if(tietKiem) {
    console.log({tietKiem})
    return `Thứ ${isDate}, ngày ${isDay}`
  }
  if(!tietKiem) {
    console.log(false)
  }
  
  let dateMonth, thang, ngayGiaoHang, thuGiaoHang, laySoNgayTrongThang;
  if (typeof isDay === "string") {
    dateMonth = isDay.slice(3); // thang type string
    thang = parseInt(dateMonth); // thang type number
    ngayGiaoHang = parseInt(isDay);
    thuGiaoHang = parseInt(isDate);
    isDateNumber = parseInt(isDay);
    laySoNgayTrongThang = new Date(2023, thang - 1, 0).getDate();
    console.log({
      ngayGiaoHang,
      thuGiaoHang,
      isDateNumber,
      laySoNgayTrongThang,
    });
  } else {
    ngayGiaoHang = isDay;
    thuGiaoHang = isDate;
    isDateNumber = isDate;
    thang = isDay;
    laySoNgayTrongThang = new Date(2023, thang, 0).getDate();
  }

  console.log(laySoNgayTrongThang);

  let ngayLuiLai = 0;
  let check = false;
  let checkMonth = false;
  if (thuGiaoHang - 2 === 0) {
    thuGiaoHang = 7;
    check = true;
  }

  if (thuGiaoHang - 2 === 1) {
    thuGiaoHang = 8;
    check = true;
  }
  if (thuGiaoHang - 2 !== 0 && thuGiaoHang - 2 !== 1 && !check) {
    thuGiaoHang -= 2;
    console.log(`&&`);
  }

  if (isDateNumber - 2 < 0) {
    ngayLuiLai = laySoNgayTrongThang - isDateNumber;
    console.log(thang);
    thang -= 1;
    checkMonth = true;
  }

  if (isDateNumber - 2 > 0) {
    isDateNumber -= 2;
    checkMonth = false;
  }

  console.log(isDateNumber, thuGiaoHang, ngayGiaoHang);

  console.log(thang);
  console.log(checkMonth);

  if (typeof isDay === "number") {
    console.log(typeof isDay);
    let newMonth =
      monthCurrent.toString().length === 1 ? `0${monthCurrent}` : monthCurrent;
    return `Thứ ${thuGiaoHang + 2}, ngày ${isDay}-${newMonth}`;
  }

  
  let newMonth = thang.toString().length === 1 ? `0${thang}` : thang;
  let thongBaoNgay = checkMonth
  ? `ngày ${ngayLuiLai} - ${newMonth}`
  : `ngày ${isDateNumber} - ${newMonth}`;
  let thongBaoThu = thuGiaoHang === 8 ? `Chủ nhật` : `Thứ ${thuGiaoHang}`;
  
  console.log(thuGiaoHang, { thongBaoThu });
  console.log({thongBaoThu, thongBaoNgay, thang})

  return check
    ? `${thongBaoThu}, ${thongBaoNgay}`
    : `${thongBaoThu}, ${thongBaoNgay}`;
};
}

export { fast, laySoNgayTrongThang };
