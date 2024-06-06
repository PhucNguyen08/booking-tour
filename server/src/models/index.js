import Site from './site.js';
import Location from './location.js';
import Tour from './tour.js';
import TypeTour from './typeTour.js';
import TourImg from './tourImg.js';
import TourSchedule from './tourSchedule.js';
import TourSite from './tourSite.js';
import User from './user.js';
import News from './news.js';
import Order from './order.js';
import OrderDetail from './orderDetail.js';
import CommentTour from './commentTour.js';

// Vị trí và địa điểm
Location.hasMany(Site, { as: 'sites', foreignKey: 'locationId' });
Site.belongsTo(Location, { as: 'location', foreignKey: 'locationId' });

// Vị trí tour
Tour.belongsTo(Location, {
    as: 'departurePlace',
    foreignKey: 'departurePlaceId',
});
Tour.belongsTo(Location, {
    as: 'destinationPlace',
    foreignKey: 'destinationPlaceId',
});

Tour.belongsTo(TypeTour, {
    as: 'typeTour',
    foreignKey: 'typeId',
});

// Hình ảnh tour
Tour.hasMany(TourImg, { as: 'images', foreignKey: 'tourId' });
TourImg.belongsTo(Tour, { as: 'tourImg', foreignKey: 'tourId' });

// Lịch trình tour
Tour.hasMany(TourSchedule, { as: 'schedules', foreignKey: 'tourId' });
TourSchedule.belongsTo(Tour, { as: 'tourSchedule', foreignKey: 'tourId' });

// Tour và địa điểm
Tour.hasMany(TourSite, { as: 'tourSites', foreignKey: 'tourId' });
TourSite.belongsTo(Tour, { as: 'tourSite', foreignKey: 'tourId' });

// Ng dùng và tin tức
User.hasMany(News, { as: 'news', foreignKey: 'userId' });
News.belongsTo(User, { as: 'userNews', foreignKey: 'userId' });

User.hasMany(Order, { as: 'orders', foreignKey: 'userId' });
Order.belongsTo(User, { as: 'userOrder', foreignKey: 'userId' });

TourSchedule.hasMany(Order, { as: 'tourOrder', foreignKey: 'tourScheduleId' });
Order.belongsTo(TourSchedule, { as: 'tourSch', foreignKey: 'tourScheduleId' });

Order.belongsToMany(User, { through: OrderDetail });
User.belongsToMany(Order, { through: OrderDetail });

Tour.belongsToMany(Site, {
    through: TourSite,
});
Site.belongsToMany(Tour, {
    through: TourSite,
});

Tour.hasMany(CommentTour, { as: 'listComment', foreignKey: 'tourId' });
CommentTour.belongsTo(User, { as: 'userComment', foreignKey: 'userId' });

export {
    Site,
    Location,
    Tour,
    TypeTour,
    TourSchedule,
    TourImg,
    TourSite,
    News,
    User,
    Order,
    OrderDetail,
    CommentTour,
};
