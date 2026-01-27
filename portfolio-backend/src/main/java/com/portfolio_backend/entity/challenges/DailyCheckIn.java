package com.portfolio_backend.entity.challenges;

import com.portfolio_backend.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;
import java.time.LocalDate;

@Entity
@Table(name = "daily_check_ins")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Accessors(chain = true)
public class DailyCheckIn extends BaseEntity<DailyCheckIn> {

    private Long participationId;

    private LocalDate checkInDate;

    private Boolean verified;
}
