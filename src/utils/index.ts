export const formatMoneyVND = (money: number): string => {
      const moneyVietNamDong = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money).replace('₫', '')
      return moneyVietNamDong
}
