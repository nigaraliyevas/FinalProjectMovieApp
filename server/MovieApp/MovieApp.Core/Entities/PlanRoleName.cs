using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class PlanRoleName : BaseEntity
    {
        public string Name { get; set; }
        public string Feature { get; set; }
        public int SubscriptionPlanId { get; set; }
        public SubscriptionPlan SubscriptionPlan { get; set; }
    }

}
