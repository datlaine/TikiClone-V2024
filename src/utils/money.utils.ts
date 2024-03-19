export const converNumberToMoney = ({ money, replace = 'VNĐ' }: { money: number; replace: string }) => {
      const moneyFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money).replace('₫', replace)
      return moneyFormat
}
