package com.portfolio_backend.entity.challenges;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name="daily_check_ins",
        uniqueConstraints = @UniqueConstraint(columnNames={"participation_id","check_in_date"})
)
@Data
public class DailyCheckIn {

    @Id
    private UUID id;

    private UUID participationId;

    private LocalDate checkInDate;

    private Boolean verificationPassed;
}
