import moment from 'moment';
import { IDayData } from '../dayData';

/**
 * 时间戳按日向下取整
 * @param time 时间戳
 * @returns 取整之后的时间戳
 */
function timestampFloor(time: number) {
  return Number(new Date(moment(time).format('YYYY/MM/DD')));
}

/**
 * 加载coinmarketcap接口格式的数据
 * @param data 数据
 * @returns 处理过的每日数据列表
 */
export
function loadFromCoinmarketcapData(data: any): IDayData[] {
  const result: IDayData[] = Object.entries(data?.data?.points || { })
    .map(([key, value]) => ({
      time: (Number(key) * 1000 || undefined) as number,
      price: ((value as any)?.v || [])[0],
      volume: ((value as any)?.v || [])[1],
    }));
  result.sort((a, b) => a.time - b.time);
  if (result.some((item) => item.time == null)) {
    throw new Error('存在timestamp为空');
  }
  if (result.some((item) => item.price == null)) {
    throw new Error('存在price为空');
  }
  if (result.some((item) => item.volume == null)) {
    throw new Error('存在volume为空');
  }
  for (let i = 1; i < result.length; ++i) {
    const currentTime = timestampFloor(result[i].time);
    const beforeTime = timestampFloor(result[i - 1].time);
    if (currentTime - beforeTime > (24 * 60 * 60 * 1000)) {
      throw new Error('存在日期数据缺失');
    }
  }
  return result;
}
